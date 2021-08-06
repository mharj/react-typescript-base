import {Action} from 'redux';

/**
 * This is meant for types which might affect all reducers
 */
const globalTypeList = ['global/RESET'] as const;
export type GlobalTypes = typeof globalTypeList[number];

// Global actions
interface IGlobalResetAction extends Action<GlobalTypes> {
	type: 'global/RESET';
}

// Merge all global actions to one type
export type GlobalAction = IGlobalResetAction;
