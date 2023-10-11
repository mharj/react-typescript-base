import {ThunkResult} from '../reducers';
import {appLogin} from '../reducers/appReducer';
import {appError} from '../reducers/common';

export const doLogin =
	(username: string, password: string): ThunkResult<Promise<boolean>> =>
	(dispatch) => {
		let result = false;
		try {
			// do async login logic here
			if (username === 'test' && password === 'password') {
				result = true;
			} else {
				throw new Error('account or password not match');
			}
		} catch (err) {
			dispatch(appError(err));
		}
		dispatch(appLogin(result));
		return Promise.resolve(result);
	};

export const doLogout = (): ThunkResult<Promise<void>> => (dispatch) => {
	// do logout here
	dispatch(appLogin(false));
	return Promise.resolve();
};
