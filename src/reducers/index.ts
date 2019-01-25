import {Action, combineReducers} from 'redux';
import {ThunkAction,ThunkDispatch} from 'redux-thunk';
import {initialState as appInitialState, IState as IAppState, reducer as appReducer, Types as AppTypes} from './appReducer';

// this ties namespaces to be same
type ReduxNameSpace = 'app';

export type ReduxState = object; // common type for all Redux States
/**
 * This enum is meant for types which might affect all reducers
 */
export enum GlobalTypes {
	RESET = 'RESET',
}
// Global actions
interface IGlobalResetAction extends Action {
	type: GlobalTypes.RESET,
}
// Merge actions
export type IGlobalAction = IGlobalResetAction;
/**
 * Helps to navigate redux state structure
 */
export interface IReduxState {
	app: IAppState;
}

/**
 * Combine all reducer action types
 */
export const Types: {[key in ReduxNameSpace]: any} = {
	app: AppTypes,
};

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: {[key in ReduxNameSpace]: ReduxState} = {
	app: appInitialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers<{[key in ReduxNameSpace]: ReduxState}>({
	app: appReducer,
});

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<IReduxState, undefined, Action>;
