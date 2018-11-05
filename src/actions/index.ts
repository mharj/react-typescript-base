import * as appActions from '../actions/appActions';
import {IActions as IAppActions} from '../actions/appActions';

export const actions = {
	...appActions,
}
// export interface IActions = IAppActions // & asd
export type IActions = IAppActions
// export default Object.assign({}, appActions);