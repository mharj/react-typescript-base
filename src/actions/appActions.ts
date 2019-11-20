import {Action} from 'redux';
import {getStore} from '../configureStore';
import {HttpClient} from '../lib/httpClient';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {AppAction} from '../reducers/appReducer';

// dispatch actions
export const appLoading = (isLoading: boolean): AppAction => {
	return {type: 'app/LOADING', isLoading};
};

export const appError = (error: string | undefined): AppAction => {
	return {type: 'app/ERROR', error};
};

export const appLogin = (isLoggedIn: boolean): AppAction => {
	return {type: 'app/LOGIN', isLoggedIn};
};

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

// this hooks global loading state updates from HttpClient
const store = getStore();
const client = HttpClient.getInstance();
client.onLoading((isLoading) => {
	store.dispatch(appLoading(isLoading));
});
export const httpFetch = client.fetch;
