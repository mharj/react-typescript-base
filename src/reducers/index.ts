import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import * as app from './appReducer';

/**
 * This enum is meant for types which might affect all reducers
 */
export enum GlobalTypes {
	RESET = 'RESET',
}
// Global actions
interface IGlobalResetAction extends Action {
	type: GlobalTypes.RESET;
}

// Merge actions
export type IGlobalAction = IGlobalResetAction;

/**
 * Helps to navigate redux state structure
 */
export interface IReduxState {
	app: app.IState;
}

/**
 * Combine all reducer action types
 */
export const Types = {
	app: app.Types,
};

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: IReduxState = {
	app: app.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers<IReduxState>({
	app: app.reducer,
});

export type ThunkResult<R> = ThunkAction<R, IReduxState, undefined, Action>;

export type RootThunkDispatch = ThunkDispatch<IReduxState, undefined, Action>;
