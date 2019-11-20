import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {initialState, rootReducer} from './reducers';

const persistConfig = {
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
const composedEnhancers = compose(
	applyMiddleware(thunk),
	...enhancers,
);

let store: ReturnType<typeof initStore> | undefined;
const initStore = () => {
	return createStore(persistedReducer, initialState, composedEnhancers);
};

let persistor: ReturnType<typeof initPersist> | undefined;
const initPersist = (currentStore: ReturnType<typeof initStore>) => {
	return persistStore(currentStore);
};

/**
 * @module createStore/default
 */
export default () => {
	if (!store) {
		store = initStore();
	}
	if (!persistor) {
		persistor = initPersist(store);
	}
	return {store, persistor};
};

export const getStore = () => {
	if (!store) {
		store = initStore();
	}
	return store;
};
