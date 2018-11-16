import {Action, combineReducers} from 'redux';
import {ThunkAction,ThunkDispatch} from 'redux-thunk';
import {initialState as appInitialState, IState as IAppState, reducer as appReducer, Types as AppTypes} from './appReducer';

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
export const Types = {
	app: AppTypes,
};

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState = {
	app: appInitialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	app: appReducer,
});

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<IReduxState, undefined, Action>;