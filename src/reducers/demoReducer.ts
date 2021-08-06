import {Action, Reducer} from 'redux';
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
}

/**
 * Initial redux state
 */
export const initialState: IState = {
	todo: undefined,
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
export const reducer: Reducer<IState, DemoAction | GlobalAction> = (state = initialState, action): IState => {
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
