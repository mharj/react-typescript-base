import {configureStore} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {getKey} from './lib/persistUtils';
import {initialState, ReduxState, rootReducer} from './reducers';

function setupStore() {
	const persistConfig: PersistConfig<ReduxState> = {
		key: getKey('root'),
		storage,
		whitelist: [],
	};
	const persistedReducer = persistReducer(persistConfig, rootReducer);
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(thunk),
		preloadedState: initialState,
		devTools: process.env.NODE_ENV === 'development',
	});
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => store.replaceReducer(persistedReducer));
	}
	return {store, persistor: persistStore(store)};
}

export const storeConfiguration = setupStore();
