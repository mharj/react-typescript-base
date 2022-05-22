import {Action, Reducer} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {getKey} from '../configureStore';
import {buildReduceConfig, migrateInit} from '../lib/persistUtils';
import {GlobalAction} from './common';

/**
 * Redux action type keys
 */
export type Types = 'demo/VALUE';

/**
 * Action interfaces
 */
interface ISetValue extends Action<Types> {
	type: 'demo/VALUE';
	todo: IToDo | undefined;
}
export type DemoAction = ISetValue;

/**
 * Redux state interface
 */
interface IState {
	todo: IToDo | undefined;
	_persist: any;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	todo: undefined,
	_persist: undefined,
};

// TODO interface
export interface IToDo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

/**
 * Reducer
 */
const reducer: Reducer<IState, DemoAction | GlobalAction> = (state = initialState, action): IState => {
	switch (action.type) {
		case 'demo/VALUE':
			return {
				...state,
				todo: action.todo,
			};
		case 'global/RESET':
			return initialState;
		default:
			return state;
	}
};

export const reducerConfig = buildReduceConfig<'demo', IState, DemoAction | GlobalAction>(
	'demo',
	initialState,
	persistReducer(
		{
			key: getKey('demo'),
			storage,
			migrate: migrateInit(initialState),
		},
		reducer,
	),
);
