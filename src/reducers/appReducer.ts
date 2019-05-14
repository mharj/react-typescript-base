import {Action, Reducer} from 'redux';
import {GlobalTypes, IGlobalAction} from './index';

/**
 * Redux action type keys
 */
export enum Types {
	APP_ERROR = 'APP_ERROR',
	APP_LOADING = 'APP_LOADING_STATE',
	APP_LOGIN = 'APP_LOGIN',
}
/**
 * Action interfaces
 */
interface IErrorAction extends Action {
	type: Types.APP_ERROR;
	error: string | undefined;
}

interface ILoginAction extends Action {
	type: Types.APP_LOGIN;
	isLoggedIn: boolean;
}

interface IApplicationLoadingAction extends Action {
	type: Types.APP_LOADING;
	isLoading: boolean;
}

export type AppAction = IApplicationLoadingAction | IErrorAction | ILoginAction | IGlobalAction;

/**
 * Redux state interface
 */
export interface IState {
	error: string | undefined;
	isLoading: boolean;
	isLoggedIn: boolean;
}

/**
 * Initial redux state
 */
export const initialState: IState = {
	error: undefined,
	isLoading: false,
	isLoggedIn: false,
};

/**
 * Reducer
 */
export const reducer: Reducer<IState> = (state = initialState, action: AppAction) => {
	switch (action.type) {
		case Types.APP_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			};
		case Types.APP_ERROR:
			return {
				...state,
				error: action.error,
			};
		case Types.APP_LOGIN:
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		case GlobalTypes.RESET:
			return initialState;
		default:
			return state;
	}
};
