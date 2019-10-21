import {applyMiddleware, createStore, Dispatch} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {resetStore, storage} from '../src/lib/testStore';
import {initialState, rootReducer} from '../src/reducers';

const persistConfig = {
	key: 'test_store',
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createTestStore = (): {dispatch: Dispatch<any>; getState: () => any} => {
	resetStore();
	return createStore(persistedReducer, initialState, applyMiddleware(thunk));
};
