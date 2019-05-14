import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult, Types} from '../reducers';
import {AppAction} from '../reducers/appReducer';

// dispatch actions
export const appLoading = (isLoading: boolean): AppAction => {
	return {type: Types.app.APP_LOADING, isLoading};
};

export const appError = (error: string | undefined): AppAction => {
	return {type: Types.app.APP_ERROR, error};
};

export const appLogin = (isLoggedIn: boolean): AppAction => {
	return {type: Types.app.APP_LOGIN, isLoggedIn};
};

export const appLogout = (): AppAction => {
	return {type: Types.app.APP_LOGIN, isLoggedIn: false};
};

export const doLogin = (username: string, password: string): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	dispatch(appError(undefined));
	if (username === 'test' && password === 'password') {
		return Promise.resolve(dispatch(appLogin(true)));
	} else {
		return Promise.reject(dispatch(appError('account or password not match')));
	}
};

export const doLogout = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(appLogout()));
};
