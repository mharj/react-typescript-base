import {combineReducers} from 'redux';
import {initialState as appInitialState, IState as IAppState, reducer as appReducer, Types as AppTypes} from './appReducer';

/**
 * This enum is meant for types which might affect all reducers
 */
export enum GlobalTypes {
	RESET = 'RESET',
}

/**
 * Helps to navigate redux state structure
 */
export interface IState {
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
