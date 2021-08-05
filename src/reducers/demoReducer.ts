import {Action, Reducer} from 'redux';
import Joi from 'joi';
import {SharedAction} from './shared';

/**
 * Redux action type keys
 */
type Types = 'demo/VALUE';

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
interface StateStore {
	todo: IToDo | undefined;
}

/**
 * Initial redux state
 */
export const initialState: StateStore = {
	todo: undefined,
};

/**
 * State persist validator
 */
export const validator = Joi.object<StateStore, true>({
	todo: Joi.object<IToDo>({
		userId: Joi.number().required(),
		id: Joi.number().required(),
		title: Joi.string().required(),
		completed: Joi.boolean().required(),
	}).optional(),
});

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
export const reducer: Reducer<StateStore, DemoAction | SharedAction> = (state = initialState, action): StateStore => {
	switch (action.type) {
		case 'demo/VALUE':
			return {
				...state,
				todo: action.todo,
			};
		case 'redux/RESET':
			return initialState;
		default:
			return state;
	}
};
