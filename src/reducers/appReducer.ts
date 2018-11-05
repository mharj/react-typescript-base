import {Reducer} from 'redux';

export enum Types {
	LOADING = 'LOADING',
	LOADING_DONE = 'LOADING_DONE',
	LOADING_ERROR = 'LOADING_ERROR',
	LOADING_NO_CHANGE = 'LOADING_NO_CHANGE',
	LOGIN = 'LOGIN',
	LOGIN_ERROR = 'LOGIN_ERROR',
	LOGOUT = 'LOGOUT',
}

export interface IState {
	isLoading: boolean,
	isLoggedIn: boolean,
	value: any,
	etag: string | null,
	error: Error | null,
}

const initialState: IState = {
	error: null,
	etag: null,
	isLoading: false,
	isLoggedIn: false,
	value: null,
}

export const reducer: Reducer<IState> = (state = initialState, action) => {
	switch (action.type) {
		case Types.LOADING:
			return {
				...state,
				error: null,
				isLoading: true,
			};
		case Types.LOADING_DONE:
			return {
				...state,
				etag: action.etag,
				isLoading: false,
				value: action.value,
			};
		case Types.LOADING_NO_CHANGE:
			return {
				...state,
				etag: action.etag,
				isLoading: false,
			};
		case Types.LOADING_ERROR:
			return {
				...state,
				error: action.error,
				etag: null,
				isLoading: false,
				value: null,
			};
		case Types.LOGIN:
			return {
				...state,
				error: null,
				isLoggedIn: true,
			};
		case Types.LOGIN_ERROR:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
			};
		case Types.LOGOUT:
			return {
				...state,
				error: null,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
