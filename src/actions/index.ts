import {Action} from 'redux';
import * as appActions from '../actions/appActions';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {IActionDispatch as IAppActionDispatch} from './appActions';
import {IActionDispatch as IGlobalActionDispatch} from './globalActions';

export const actions = {
	...appActions,
};

export const handleJsonResponse = <T>(res: Response, unAuthorizedAction?: () => Action): ThunkResult<Promise<T | undefined>> => async (
	dispatch: RootThunkDispatch,
) => {
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
