import {Action, Reducer} from 'redux';
import {IEtagObject} from '../lib/etagTools';
import {GlobalTypes, IGlobalAction} from './index';

/**
 * Redux action type keys
 */
export enum Types {
	DEMO_VALUE = 'DEMO_VALUE',
}

/**
 * Action interfaces
 */
interface ISetValue extends Action {
	type: Types.DEMO_VALUE;
	todo: IEtagObject<IToDo>;
}
export type DemoAction = ISetValue | IGlobalAction;

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
	userId:number,
	id: number,
	title: string,
	completed: boolean,
}

/**
 * Reducer
 */
export const reducer: Reducer<IState> = (state = initialState, action: DemoAction) => {
	switch (action.type) {
		case Types.DEMO_VALUE:
			return {
				...state,
				todo: action.todo,
			};
		case GlobalTypes.RESET:
			return initialState;
		default:
			return state;
	}
};
