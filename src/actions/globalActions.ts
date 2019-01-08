import {Action, Dispatch} from 'redux';
import {RemapActionCreators} from '../lib/actionTools';
import {GlobalTypes, IGlobalAction, ThunkResult} from '../reducers';

// dispatcher actions
const doRestAction = (): IGlobalAction => {
	return {type: GlobalTypes.RESET};
};

// async functions
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: Dispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};

// build action mapper for redux
const GlogalDispatchPropsMap = {
	doReset,
};

export type IActionDispatch = RemapActionCreators<typeof GlogalDispatchPropsMap>;
