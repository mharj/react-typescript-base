import {Action} from 'redux';
import {handleJsonResponse} from '.';
import {dFetch} from '../lib/dFetch';
import {getEtagHeader, IEtagObject, isEtagObject, wrapEtag} from '../lib/etagTools';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';
import {DemoAction, IToDo} from '../reducers/demoReducer';
import {appError, appLogout} from './appActions';

// dispatch actions
const setValueAction = (todo: IEtagObject<IToDo>): DemoAction => {
	return {type: 'DEMO_VALUE', todo};
};

// async functions
export const getHome = (): ThunkResult<Promise<Action | void>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
	dispatch(appError(undefined));
	const {
		demo: {todo},
	} = getState();
	const headers = new Headers();
	if (isEtagObject(todo) && todo.etag) {
		headers.set('if-none-match', todo.etag);
	}
	try {
		const res = await dispatch(dFetch('https://jsonplaceholder.typicode.com/todos/1', {headers}));
		const todoData = await dispatch(handleJsonResponse<IToDo>(res, appLogout));
		if (todoData) {
			return Promise.resolve(dispatch(setValueAction(wrapEtag<IToDo>(todoData, getEtagHeader(res)))));
		}
	} catch (err) {
		return Promise.reject(dispatch(appError(err.message)));
	}
};
