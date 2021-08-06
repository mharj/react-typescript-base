import {Action} from 'redux';
import {RootThunkDispatch, ThunkResult} from '../reducers';
import {GlobalAction} from '../reducers/common';

// dispatcher actions
function doRestAction(): GlobalAction {
	return {type: 'global/RESET'};
}

// async functions
/**
 * reset redux to initial state
 */
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};
