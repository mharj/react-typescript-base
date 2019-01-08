import * as appActions from '../actions/appActions';
import {IActionDispatch as IAppActionDispatch} from './appActions';
import {IActionDispatch as IGlobalActionDispatch} from './globalActions';

export const actions = {
	...appActions,
}

export type IActionDispatch = IGlobalActionDispatch & IAppActionDispatch;
