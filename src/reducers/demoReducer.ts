import {Action, Reducer} from 'redux';
import {IEtagObject} from '../lib/etagTools';
import {IGlobalAction} from './index';

/**
 * Redux action type keys
 */
export type Types = 'demo/VALUE';

/**
 * Action interfaces
 */
interface ISetValue extends Action<Types> {
	type: 'demo/VALUE';
	todo: IEtagObject<IToDo>;
}
export type DemoAction = ISetValue;

/**
 * Redux state interface
 */
export interface IState {
	todo: IEtagObject<IToDo> | undefined;
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
export const reducer: Reducer<IState, DemoAction | IGlobalAction> = (state = initialState, action): IState => {
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
