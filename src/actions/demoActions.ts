import {handleJsonResponse} from '.';
import {cacheMatch, cacheStore, isOnline} from '../lib/commonCache';
import {httpFetch} from '../lib/httpInstance';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';
import {DemoAction, IToDo} from '../reducers/demoReducer';
import {appError, appLogout} from './appActions';

// dispatch actions
function setValueAction(todo: IToDo | undefined): DemoAction {
	return {
		type: 'demo/VALUE',
		todo,
	};
}

// thunk async functions
export const getHome = (): ThunkResult<Promise<void>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
	dispatch(appError(undefined));
	try {
		const headers = new Headers();
		const req = new Request('https://jsonplaceholder.typicode.com/todos/1', {headers});
		let res = await cacheMatch(req, {ifNoneMatch: true}); // check cached response (and update if-none-match to req if have etag)
		const cacheData = await dispatch(handleJsonResponse<IToDo>(res));
		if (isOnline()) {
			res = await httpFetch(req);
			await cacheStore(req, res);
			const data = await dispatch(handleJsonResponse<IToDo>(res, appLogout));
			if (data) {
				// we have new data
				dispatch(setValueAction(data));
			} else if (cacheData) {
				// cached data still valid
				dispatch(setValueAction(cacheData));
			}
		} else {
			if (cacheData) {
				// we are offline, use latest data from cache
				dispatch(setValueAction(cacheData));
			}
		}
	} catch (err) {
		dispatch(appError(err.message));
		return Promise.reject(err);
	}
};
