import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {appError, appLogin} from '../reducers/appReducer';

export const doLogin =
	(username: string, password: string): ThunkResult<Promise<Action>> =>
	(dispatch: RootThunkDispatch) => {
		dispatch(appError(undefined));
		if (username === 'test' && password === 'password') {
			return Promise.resolve(dispatch(appLogin(true)));
		} else {
			dispatch(appLogin(false));
			return Promise.reject(dispatch(appError('account or password not match')));
		}
	};

export const doLogout = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(appLogin(false)));
};
