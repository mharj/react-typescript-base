import { TypedUseSelectorHook,useSelector as useReduxSelector } from 'react-redux';
import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import * as app from './appReducer';
import * as demo from './demoReducer';

/**
 * This enum is meant for types which might affect all reducers
 */
export type GlobalTypes = 'global/RESET';
// Global actions
interface IGlobalResetAction extends Action<GlobalTypes> {
	type: 'global/RESET';
}

// Merge global actions
export type IGlobalAction = IGlobalResetAction;

/**
 * Helps to navigate redux state structure
 */
export interface IReduxState {
	app: app.IState;
	demo: demo.IState;
}

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: IReduxState = {
	app: app.initialState,
	demo: demo.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers<IReduxState>({
	app: app.reducer,
	demo: demo.reducer,
});

/**
 * mapStateToProps "hook"
 * @example
 * const data = useSelector((state) => ({
 *   qwe: state.demo.todo,
 * }));
 */
export const useSelector: TypedUseSelectorHook<IReduxState> = useReduxSelector

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<IReduxState, undefined, Action>;
