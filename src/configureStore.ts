import {configureStore} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {getKey, ignoredActions} from './lib/persist';
import {initialState, ReduxState, rootReducer} from './reducers';

const persistConfig: PersistConfig<ReduxState> = {
	key: getKey('root'),
	storage,
	whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions,
			},
		}).concat(thunk),
	preloadedState: initialState,
	devTools: process.env.NODE_ENV === 'development',
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./reducers', () => store.replaceReducer(persistedReducer));
}

export const persistor = persistStore(store);
