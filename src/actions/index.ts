import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';

// async functions
export function isJson(res: Response) {
	return res.headers.get('Content-type')?.startsWith('application/json');
}

export const handleJsonResponse =
	<T>(res: Response | undefined, unAuthorizedAction?: () => Action): ThunkResult<Promise<T> | undefined> =>
	(dispatch: RootThunkDispatch) => {
		if (!res) {
			return;
		}
		switch (res.status) {
			case 200:
			case 201:
				if (!isJson(res)) {
					throw new Error('not json payload');
				}
				return res.json();
			case 204:
			case 304:
				return;
			case 401: {
				if (dispatch && unAuthorizedAction) {
					dispatch(unAuthorizedAction());
					return;
				}
				throw new Error('http error: ' + res.status);
			}
			default:
				throw new Error('http error: ' + res.status);
		}
	};
