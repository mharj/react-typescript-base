import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {initialState, ReduxState, rootReducer} from './reducers';
import {setupStoreLinks} from './storeLinks';

export function getKey(key: string): string {
	return 'persist_' + key;
}

const persistConfig: PersistConfig<ReduxState> = {
	key: getKey('root'),
	storage,
	whitelist: [],
};

const enhancers: StoreEnhancer[] = [];

interface WindowDevTools extends Window {
	__REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
if (process.env.NODE_ENV === 'development' && '__REDUX_DEVTOOLS_EXTENSION__' in window) {
	const devToolsExtension = (window as WindowDevTools).__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}
const composedEnhancers = compose(applyMiddleware(thunk), ...enhancers) as StoreEnhancer;

let store: ReturnType<typeof initStore> | undefined;
const initStore = () => {
	const currentStore = createStore(persistedReducer, initialState, composedEnhancers);
	setupStoreLinks(currentStore);
	return currentStore;
};
export type StoreType = ReturnType<typeof initStore>;

let persistor: ReturnType<typeof initPersist> | undefined;
const initPersist = (currentStore: ReturnType<typeof initStore>) => {
	return persistStore(currentStore);
};

function setupStore() {
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

export const getStore = () => {
	if (!store) {
		store = initStore();
	}
	return store;
};
