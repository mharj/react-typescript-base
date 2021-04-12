import {Action} from 'redux';
import {IGlobalAction, RootThunkDispatch, ThunkResult} from '../reducers';

// dispatcher actions
function doRestAction(): IGlobalAction {
	return { type: 'global/RESET' };
}

// async functions
/**
 * reset redux to initial state
 */
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};
