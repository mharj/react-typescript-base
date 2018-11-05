import {combineReducers} from 'redux';
import {IState as IAppState, reducer as appReducer, Types as AppTypes} from './appReducer';

export interface IState {
	app: IAppState;
}

export const Types = {
	app: AppTypes,
};

export const rootReducer = combineReducers({
	app: appReducer,
});
