import {Action} from 'redux';
import {GlobalTypes, IGlobalAction, RootThunkDispatch,ThunkResult, } from '../reducers';

// dispatcher actions
const doRestAction = (): IGlobalAction => {
	return {type: GlobalTypes.RESET};
};

// async functions
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};

