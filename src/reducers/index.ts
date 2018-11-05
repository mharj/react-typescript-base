import {combineReducers} from 'redux';
import app from './appReducer';
import {ACTION_TYPES, IState as IAppState} from './appReducer';

export interface IState {
	app: IAppState
}

export const Types = {
	app: ACTION_TYPES,
}

const appReducer = combineReducers({
	app,
});
export default appReducer;
