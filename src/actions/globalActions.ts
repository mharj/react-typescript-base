import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {resetAction} from '../reducers/common';

// async functions
/**
 * reset redux to initial state
 */
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(resetAction()));
};
