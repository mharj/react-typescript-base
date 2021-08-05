import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistConfig} from 'redux-persist/lib/types';
import thunk from 'redux-thunk';
import jsonTransform from './persist/jsonTransform';
import {initialState, ReduxState, rootReducer, stateValidator} from './reducers';

const persistConfig: PersistConfig<ReduxState, ReduxState, ReduxState, ReduxState> = {
	key: 'root',
	storage,
	transforms: [stateValidator, jsonTransform({logger: process.env.NODE_ENV === 'development' ? console : undefined})],
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
export const initStore = () => {
	return createStore(persistedReducer, initialState, composedEnhancers);
};

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
