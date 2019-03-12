import {Action} from 'redux';
import {handleJsonResponse} from '.';
import {IToDo} from '../interfaces/todo';
import {RemapActionCreators} from '../lib/actionTools';
import {dFetch} from '../lib/dFetch';
import {getEtagHeader, IEtagData, wrapEtag} from '../lib/etagTools';
import {IReduxState, RootThunkDispatch, ThunkResult, Types} from '../reducers';
import {AppAction} from '../reducers/appReducer';

// dispatch actions
export const setAppLoadingAction = (isLoading: boolean): AppAction => {
	return {type: Types.app.APP_LOADING_STATE, isLoading};
};

const setValueAction = (todo: IEtagData<IToDo>): AppAction => {
	return {type: Types.app.APP_SET_VALUE, todo};
};
const setErrorAction = (error: string): AppAction => {
	return {type: Types.app.APP_SET_ERROR, error};
};

const clearErrorAction = (): AppAction => {
	return {type: Types.app.APP_CLEAR_ERROR};
};
const setLoginAction = (): AppAction => {
	return {type: Types.app.LOGIN};
};
const setLogoutAction = (): AppAction => {
	return {type: Types.app.LOGOUT};
};

// async functions
export const getHome = (): ThunkResult<Promise<Action | void>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
	const state = getState();
	const headers = new Headers();
	if (state.app.todo && state.app.todo.etag) {
		headers.set('if-none-match', state.app.todo.etag);
	}
	try {
		const res = await dispatch(dFetch('https://jsonplaceholder.typicode.com/todos/1', {headers}));
		const todo = await dispatch(handleJsonResponse<IToDo>(res, setLogoutAction));
		if (todo) {
			return Promise.resolve(dispatch(setValueAction(wrapEtag<IToDo>(todo, getEtagHeader(res)))));
		}
	} catch (err) {
		return Promise.reject(dispatch(setErrorAction(err.message)));
	}
};

export const doLogin = (username: string, password: string): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	dispatch(clearErrorAction());
	if (username === 'test' && password === 'password') {
		return Promise.resolve(dispatch(setLoginAction()));
	} else {
		return Promise.reject(dispatch(setErrorAction('account or password not match')));
	}
};

export const doLogout = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(setLogoutAction()));
};

// build action mapper for redux
const AppDispatchPropsMap = {
	doLogin,
	doLogout,
	getHome,
};
export type IActionDispatch = RemapActionCreators<typeof AppDispatchPropsMap>;
