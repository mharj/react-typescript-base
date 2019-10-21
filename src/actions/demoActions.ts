import {handleJsonResponse} from '.';
import {dFetch} from '../lib/dFetch';
import {getEtagHeader, IEtagObject, isEtagObject, wrapEtag} from '../lib/etagTools';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';
import {DemoAction, IToDo} from '../reducers/demoReducer';
import {appError, appLogout} from './appActions';

// dispatch actions
const setValueAction = (todo: IEtagObject<IToDo>): DemoAction => {
	return {type: 'demo/VALUE', todo};
};

// async functions
export const getHome = (): ThunkResult<Promise<void>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
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
			dispatch(setValueAction(wrapEtag<IToDo>(todoData, getEtagHeader(res))));
		}
		return Promise.resolve();
	} catch (err) {
		dispatch(appError(err.message));
		return Promise.reject(err);
	}
};
