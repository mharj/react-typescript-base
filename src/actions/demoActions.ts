import {handleJsonResponse} from '.';
import {cacheMatch, cacheStore, isOnline} from '../lib/commonCache';
import {httpFetch} from '../lib/httpFetch';
import {ThunkResult} from '../reducers';
import {appError, appLogout} from '../reducers/appReducer';
import {setDemo} from '../reducers/demoReducer';

export interface IToDo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

// thunk async functions
export const getHome = (): ThunkResult<Promise<void>> => async (dispatch /* getState */) => {
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
				dispatch(setDemo(data));
			} else if (cacheData) {
				// cached data still valid
				dispatch(setDemo(cacheData));
			}
		} else {
			if (cacheData) {
				// we are offline, use latest data from cache
				dispatch(setDemo(cacheData));
			}
		}
	} catch (err: unknown) {
		dispatch(appError(err));
		return Promise.reject(err);
	}
};
