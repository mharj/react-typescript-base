import {Action, Reducer} from 'redux';
import {IToDo} from '../interfaces/todo';
import {IEtagData} from '../lib/etagTools';
import {GlobalTypes, IGlobalAction} from './index';

/**
 * Action types
 */
export enum Types {
	APP_LOADING_STATE = 'APP_LOADING_STATE',
	APP_SET_VALUE = 'APP_SET_VALUE',
	APP_SET_ERROR = 'APP_SET_ERROR',
	APP_CLEAR_ERROR = 'APP_CLEAR_ERROR',
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

interface IApplicationLoadingAction extends Action {
	type: Types.APP_LOADING_STATE;
	isLoading: boolean;
}

export type AppAction = IApplicationLoadingAction | ISetValue | ISetError | IClearError | ILogin | ILogout | IGlobalAction;

/**
 * State interface
 */
export interface IState {
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
		case Types.APP_LOADING_STATE:
			return {
				...state,
				isLoading: action.isLoading,
			};
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
