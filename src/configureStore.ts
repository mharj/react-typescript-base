import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {initialState, ReduxState, rootReducer} from './reducers';

const persistConfig: PersistConfig<ReduxState> = {
	key: 'root',
	storage,
};

const enhancers: StoreEnhancer[] = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);
if (process.env.NODE_ENV === 'development' && '__REDUX_DEVTOOLS_EXTENSION__' in window) {
	const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}
const composedEnhancers = compose(applyMiddleware(thunk), ...enhancers) as any;

let store: ReturnType<typeof initStore> | undefined;
const initStore = () => {
	return createStore(persistedReducer, initialState, composedEnhancers);
};
type InitStoreType = ReturnType<typeof initStore>;

let persistor: ReturnType<typeof initPersist> | undefined;
const initPersist = (currentStore: ReturnType<typeof initStore>) => {
	return persistStore(currentStore);
};
type InitPersistType = ReturnType<typeof initPersist>;

function setupStore(): {store: InitStoreType; persistor: InitPersistType} {
	if (!store) {
		store = initStore();
	}
	if (!persistor) {
		persistor = initPersist(store);
	}
	return {store, persistor};
}

/**
 * @module createStore/default
 */
export default setupStore;

export const getStore = (): InitStoreType => {
	if (!store) {
		store = initStore();
	}
	return store;
};
