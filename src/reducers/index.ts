import {TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector} from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import {getKey} from '../configureStore';
import * as app from './appReducer';
import * as demo from './demoReducer';

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: ReduxState = {
	app: app.initialState,
	demo: demo.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	app: persistReducer({key: getKey('app'), storage, blacklist: ['isLoading']}, app.reducer),
	demo: persistReducer({key: getKey('demo'), storage}, demo.reducer),
});

/**
 * mapStateToProps hook
 * @example
 * const {todo} = useSelector((state) => ({
 *   todo: state.demo.todo,
 * }));
 */
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/**
 * useThunkDispatch hook
 * @example
 * const dispatch = useThunkDispatch();
 * dispatch(someThunkAction());
 */
export const useThunkDispatch = (): RootThunkDispatch => useDispatch<RootThunkDispatch>();

export type ReduxState = ReturnType<typeof rootReducer>;

export type ThunkResult<R> = ThunkAction<R, ReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<ReduxState, undefined, Action>;
