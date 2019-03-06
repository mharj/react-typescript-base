import {Action, Dispatch} from 'redux';
import * as appActions from '../actions/appActions';
import {IActionDispatch as IAppActionDispatch} from './appActions';
import {IActionDispatch as IGlobalActionDispatch} from './globalActions';

export const actions = {
	...appActions,
};

/**
 * Handle fetch responses
 * @param res
 * @param dispatch
 * @param unAuthorizedAction
 * @return payload if 200, else undefined if 304 and 401 user dispatch and unAuthorizedAction
 */
export const getFetchData = async <T>(res: Response, dispatch?: Dispatch, unAuthorizedAction?: () => Action): Promise<T | undefined> => {
	let payload: T | undefined;
	try {
		payload = (await res.json()) as T;
	} catch (err) {
		// ignore
	}
	switch (res.status) {
		case 200:
			return Promise.resolve(payload);
		case 304:
			return Promise.resolve(undefined);
		case 401: {
			if (dispatch && unAuthorizedAction) {
				dispatch(unAuthorizedAction());
				return Promise.resolve(undefined);
			}
		}
		default:
			return Promise.reject(new Error('http error: ' + res.status));
	}
};

export type IActionDispatch = IGlobalActionDispatch & IAppActionDispatch;
