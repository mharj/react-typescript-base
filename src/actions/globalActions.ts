import {Action, Dispatch} from 'redux';
import {GlobalTypes, IGlobalAction, ThunkResult} from '../reducers';

const doRestAction = (): IGlobalAction => {
	return {type: GlobalTypes.RESET};
};

export type TDoRest = () => Promise<Action>;
export const doReset = (): ThunkResult<Promise<Action>> => (dispatch: Dispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};
