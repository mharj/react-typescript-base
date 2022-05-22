import {Action, Reducer} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {getKey} from '../configureStore';
import {buildReduceConfig, migrateInit} from '../lib/persistUtils';
import {GlobalAction} from './common';

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
interface IState {
	error: string | undefined;
	isLoading: boolean;
	isLoggedIn: boolean;
	_persist: any;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	error: undefined,
	isLoading: false,
	isLoggedIn: false,
	_persist: undefined,
};

/**
 * Reducer
 */
const reducer: Reducer<IState, AppAction | GlobalAction> = (state = initialState, action): IState => {
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

export const reducerConfig = buildReduceConfig<'app', IState, AppAction | GlobalAction>(
	'app',
	initialState,
	persistReducer(
		{
			key: getKey('app'),
			storage,
			blacklist: ['isLoading', 'error'],
			migrate: migrateInit(initialState),
		},
		reducer,
	),
);
