import {Action, Reducer} from 'redux';
import {IToDo} from '../interfaces/todo';
import {IEtagData} from '../lib/etagTools';
import {GlobalTypes, IGlobalAction, ReduxState} from './index';

/**
 * Action types
 */
export enum Types {
	APP_SET_VALUE = 'APP_SET_VALUE',
	APP_SET_ERROR = 'APP_SET_ERROR',
	APP_CLEAR_ERROR = 'APP_CLEAR_ERROR',
	LOADING = 'LOADING',
	LOADING_DONE = 'LOADING_DONE',
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}
/**
 * Action interfaces
 */
interface ISetValue extends Action {
	type: Types.APP_SET_VALUE;
	todo: IEtagData<IToDo>;
}

interface ILoading extends Action {
	type: Types.LOADING;
}
interface ILoadingDone extends Action {
	type: Types.LOADING_DONE;
}
interface ISetError extends Action {
	type: Types.APP_SET_ERROR;
	error: string;
}

interface IClearError extends Action {
	type: Types.APP_CLEAR_ERROR;
}

interface ILogin extends Action {
	type: Types.LOGIN;
}
interface ILogout extends Action {
	type: Types.LOGOUT;
}

export type AppAction = ISetValue | ILoading | ISetError | IClearError | ILoadingDone | ILogin | ILogout | IGlobalAction;

/**
 * State interface
 */
export interface IState extends ReduxState {
	error: string | null;
	isLoading: boolean;
	isLoggedIn: boolean;
	todo: IEtagData<IToDo> | null;
}

/**
 * Initial state
 */
export const initialState: IState = {
	error: null,
	isLoading: false,
	isLoggedIn: false,
	todo: null,
};

/**
 * Reducer
 */
export const reducer: Reducer<IState> = (state = initialState, action: AppAction) => {
	switch (action.type) {
		case Types.APP_SET_VALUE:
			return {
				...state,
				todo: action.todo,
			};
		case Types.APP_SET_ERROR:
			return {
				...state,
				error: action.error,
			};
		case Types.APP_CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case Types.LOADING:
			return {
				...state,
				error: null,
				isLoading: true,
			};
		case Types.LOADING_DONE:
			return {
				...state,
				isLoading: false,
			};
		case Types.LOGIN:
			return {
				...state,
				error: null,
				isLoggedIn: true,
			};
		case Types.LOGOUT:
			return {
				...state,
				error: null,
				isLoggedIn: false,
			};
		case GlobalTypes.RESET:
			return initialState;
		default:
			return state;
	}
};
