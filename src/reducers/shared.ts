import {Action} from 'redux';

/**
 * This enum is meant for types which might affect all reducers
 */
type GlobalTypes = 'redux/RESET' | 'persist/REHYDRATE';
// Global actions
interface IGlobalResetAction extends Action<GlobalTypes> {
	type: 'redux/RESET';
}


interface IPersistRehydrate extends Action<GlobalTypes> {
	type: 'persist/REHYDRATE';
}


// Merge global actions
export type SharedAction = IGlobalResetAction | IPersistRehydrate;
