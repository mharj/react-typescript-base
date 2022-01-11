import {applyMiddleware, createStore, Dispatch} from 'redux';
import {PersistConfig, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {resetStore, storage} from './testStore';
import {initialState, ReduxState, rootReducer} from '../../src/reducers';
import {setupStoreLinks} from '../../src/storeLinks';

const persistConfig: PersistConfig<ReduxState> = {
	key: 'test_store',
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createTestStore = (): {dispatch: Dispatch<any>; getState: () => any} => {
	resetStore();
	const currentStore = createStore(persistedReducer, initialState, applyMiddleware(thunk));
	setupStoreLinks(currentStore);
	return currentStore;
};
