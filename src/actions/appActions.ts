import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {AppAction} from '../reducers/appReducer';

// dispatch actions
export const appLoading = (isLoading: boolean): AppAction => ({type: 'app/LOADING', isLoading});

const appError = (error: string | undefined): AppAction => ({type: 'app/ERROR', error});

export const appLogin = (isLoggedIn: boolean): AppAction => ({type: 'app/LOGIN', isLoggedIn});

export const appLogout: () => AppAction = appLogin.bind(undefined, false);

export const setError = (value: unknown) => {
	if (value === undefined) {
		return appError(undefined);
	}
	if (typeof value === 'string') {
		return appError(value);
	}
	if (typeof value === 'object' && value instanceof Error) {
		return appError(value.message);
	}
	return appError(`${value}`);
};

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
	return Promise.resolve(dispatch(appLogout()));
};
