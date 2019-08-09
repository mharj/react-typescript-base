import {Action, Reducer} from 'redux';
import {IGlobalAction} from './index';

/**
 * Redux action type keys
 */
export type Types = 'APP_ERROR' | 'APP_LOADING_STATE' | 'APP_LOGIN';

/**
 * Action interfaces
 */
interface IErrorAction extends Action<Types> {
	type: 'APP_ERROR';
	error: string | undefined;
}

interface ILoginAction extends Action<Types> {
	type: 'APP_LOGIN';
	isLoggedIn: boolean;
}

interface IApplicationLoadingAction extends Action<Types> {
	type: 'APP_LOADING_STATE';
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
export const reducer: Reducer<IState, AppAction> = (state = initialState, action): IState => {
	switch (action.type) {
		case 'APP_LOADING_STATE':
			return {
				...state,
				isLoading: action.isLoading,
			};
		case 'APP_ERROR':
			return {
				...state,
				error: action.error,
			};
		case 'APP_LOGIN':
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};
