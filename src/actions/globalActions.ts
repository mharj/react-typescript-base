import {Action} from 'redux';
import {RemapActionCreators} from '../lib/actionTools';
import {GlobalTypes, IGlobalAction, RootThunkDispatch,ThunkResult, } from '../reducers';

// dispatcher actions
const doRestAction = (): IGlobalAction => {
	return {type: GlobalTypes.RESET};
};

// async functions
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: RootThunkDispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};

// build action mapper for redux
const GlogalDispatchPropsMap = {
	doReset,
};

export type IActionDispatch = RemapActionCreators<typeof GlogalDispatchPropsMap>;
