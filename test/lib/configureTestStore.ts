import {configureStore} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {getKey, ignoredActions} from '../../src/lib/persist';
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
					ignoredActions,
				},
			}).concat(thunk),
		preloadedState: initialState,
		devTools: false,
	});
	return {store, persistor: persistStore(store)};
}
