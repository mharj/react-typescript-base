export enum ACTION_TYPES {
	LOADING = 'LOADING',
	LOADING_DONE = 'LOADING_DONE',
	LOADING_ERROR = 'LOADING_ERROR',
	LOADING_NO_CHANGE = 'LOADING_NO_CHANGE',
	LOGIN = 'LOGIN',
	LOGIN_ERROR = 'LOGIN_ERROR',
	LOGOUT = 'LOGOUT',
}

interface IAppReducer extends IState {
	type: ACTION_TYPES,
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

export default (state = {...initialState}, action: IAppReducer) => {
	switch (action.type) {
		case ACTION_TYPES.LOADING:
			return {
				...state,
				error: null,
				isLoading: true,
			};
		case ACTION_TYPES.LOADING_DONE:
			return {
				...state,
				etag: action.etag,
				isLoading: false,
				value: action.value,
			};
		case ACTION_TYPES.LOADING_NO_CHANGE:
			return {
				...state,
				etag: action.etag,
				isLoading: false,
			};
		case ACTION_TYPES.LOADING_ERROR:
			return {
				...state,
				error: action.error,
				etag: null,
				isLoading: false,
				value: null,
			};
		case ACTION_TYPES.LOGIN:
			return {
				...state,
				error: null,
				isLoggedIn: true,
			};
		case ACTION_TYPES.LOGIN_ERROR:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
			};
		case ACTION_TYPES.LOGOUT:
			return {
				...state,
				error: null,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
