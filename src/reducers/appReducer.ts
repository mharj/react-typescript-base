import {Action, Reducer} from 'redux';
import {IGlobalAction} from './index';

/**
 * Redux action type keys
 */
export type Types = 'app/ERROR' | 'app/LOADING' | 'app/LOGIN';

/**
 * Action interfaces
 */
interface IErrorAction extends Action<Types> {
	type: 'app/ERROR';
	error: string | undefined;
}

interface ILoginAction extends Action<Types> {
	type: 'app/LOGIN';
	isLoggedIn: boolean;
}

interface IApplicationLoadingAction extends Action<Types> {
	type: 'app/LOADING';
	isLoading: boolean;
}

export type AppAction = IApplicationLoadingAction | IErrorAction | ILoginAction;

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
export const reducer: Reducer<IState, AppAction | IGlobalAction> = (state = initialState, action): IState => {
	switch (action.type) {
		case 'app/LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		case 'app/ERROR':
			return {
				...state,
				error: action.error,
			};
		case 'app/LOGIN':
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		case 'global/RESET':
			return initialState;
		default:
			return state;
	}
};
