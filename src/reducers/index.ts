import {combineReducers} from 'redux';
import {initialState as appInitialState, IState as IAppState, reducer as appReducer, Types as AppTypes} from './appReducer';

export enum GlobalTypes {
	RESET = 'RESET',
}

export interface IState {
	app: IAppState;
}

export const Types = {
	app: AppTypes,
};

export const initialState = {
	app: appInitialState,
};

export const rootReducer = combineReducers({
	app: appReducer,
});
