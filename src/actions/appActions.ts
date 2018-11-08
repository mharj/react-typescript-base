import fetch from 'cross-fetch';
import {AnyAction, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {GlobalTypes, IState, Types} from '../reducers';
// https://github.com/reduxjs/redux-thunk/blob/master/test/typescript.ts
interface IApiDAta {
	hello: string;
}

interface IData {
	etag: string | null;
	json: IApiDAta | null;
}

export interface IActions {
	getHome: (etag: string) => void;
	doLogin: (username: string, password: string) => Promise<any>;
	doLogout: () => Promise<any>;
	doReset: () => void;
}

export const getHome = (etag: string) => (dispatch: Dispatch, getState: () => IState) => {
	dispatch({type: Types.app.LOADING});
	setTimeout(() => {
		//  ajax delay 1sec
		const headers = {};
		if (etag) {
			headers['if-none-match'] = etag;
		}
		fetch('/api/hello', {headers})
			.then((response) => {
				let etagValue: string | null = null;
				if (response.status === 304) {
					return Promise.resolve(null);
				} else {
					if (response.headers.has('ETag')) {
						const respEtag = response.headers.get('ETag');
						if (respEtag !== null) {
							etagValue = respEtag;
						}
					}
					return response.json().then((json) => {
						return Promise.resolve({etag: etagValue, json});
					});
				}
			})
			.then((data: IData) => {
				if (data) {
					if (data.json && data.json.hello) {
						dispatch({type: Types.app.LOADING_DONE, value: data.json.hello, etag: data.etag});
					} else {
						throw new Error('no value found!');
					}
				} else {
					dispatch({type: Types.app.LOADING_NO_CHANGE});
				}
			})
			.catch((error: Error) => {
				dispatch({type: Types.app.LOADING_ERROR, error});
			});
	}, 1000);
};

export const doLogin = (username: string, password: string) => (dispatch: Dispatch) => {
	if (username === 'test' && password === 'password') {
		return Promise.resolve(dispatch({type: Types.app.LOGIN}));
	} else {
		return Promise.reject(dispatch({type: Types.app.LOGIN_ERROR, error: new Error('account or password not match')}));
	}
};

export const doLogout = () => (dispatch: Dispatch) => {
	return Promise.resolve(dispatch({type: Types.app.LOGOUT}));
};

export const doReset = () => (dispatch: Dispatch) => {
	return Promise.resolve(dispatch({type: GlobalTypes.RESET}));
};

export const test = (): ThunkAction<any, IState, void, AnyAction> => (dispatch, getState: () => IState) => {
	dispatch({type: Types.app.LOGOUT});
};
