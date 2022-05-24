import {configureStore} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {getKey} from '../../src/lib/persistUtils';
import {initialState, ReduxState, rootReducer} from '../../src/reducers';

export function createTestStore() {
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
		devTools: false,
	});
	return {store, persistor: persistStore(store)};
}
