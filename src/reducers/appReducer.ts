import {Action, Reducer} from 'redux';
import Joi from 'joi';
import {SharedAction} from './shared';

/**
 * Redux action type keys
 */
type Types = 'app/ERROR' | 'app/LOADING' | 'app/LOGIN';

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
interface StateStore {
	error: string | undefined;
	isLoading: boolean;
	isLoggedIn: boolean;
	dateDemo: Date;
}

/**
 * Initial redux state
 */
export const initialState: StateStore = {
	error: undefined,
	isLoading: false,
	isLoggedIn: false,
	dateDemo: new Date(),
};

/**
 * State persist validator
 */
export const validator = Joi.object<StateStore, true>({
	error: Joi.string().optional(),
	isLoading: Joi.boolean().required(),
	isLoggedIn: Joi.boolean().required(),
	dateDemo: Joi.object().required(),
});

/**
 * Reducer
 */
export const reducer: Reducer<StateStore, AppAction | SharedAction> = (state = initialState, action): StateStore => {
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
		case 'redux/RESET':
			return initialState;
		default:
			return state;
	}
};
