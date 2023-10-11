import {cacheMatch, cacheStore} from '@mharj/cache-storage';
import {httpFetch} from '../lib/httpFetch';
import {ThunkResult} from '../reducers';
import {appError} from '../reducers/common';
import {setDemo} from '../reducers/demoReducer';
import {isOnline} from '../lib/browser';

// thunk async functions
export const getTodo =
	(index: number): ThunkResult<Promise<void>> =>
	async (dispatch) => {
		try {
			const headers = new Headers();
			const req = new Request(`https://jsonplaceholder.typicode.com/todos/${index}`, {headers});
			const cacheRes = await cacheMatch(req, {ifNoneMatch: true}); // check cached response (and update if-none-match to req if have etag)
			if (isOnline()) {
				const res = await httpFetch(req);
				if (!res.ok && res.status !== 304) {
					throw new Error(`fetch error: ${res.status} ${res.statusText}`);
				}
				if (res.status !== 304) {
					await cacheStore(req, res);
					const data = await res.json();
					// TODO: validate data
					dispatch(setDemo(data));
				}
			}
			if (cacheRes) {
				const data = await cacheRes.json();
				// TODO: validate data
				dispatch(setDemo(data));
			}
		} catch (err: unknown) {
			dispatch(appError(err));
			return Promise.reject(err);
		}
	};
