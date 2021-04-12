import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {AppAction} from '../reducers/appReducer';

// dispatch actions
export function appLoading(isLoading: boolean): AppAction {
	return { type: 'app/LOADING', isLoading };
}

export function appError(error: string | undefined): AppAction {
	return { type: 'app/ERROR', error };
}

export function appLogin(isLoggedIn: boolean): AppAction {
	return { type: 'app/LOGIN', isLoggedIn };
}

export const appLogout: () => AppAction = appLogin.bind(undefined, false);

export const doLogin = (username: string, password: string): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
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


