import {v4 as uuid} from 'uuid';
import {appLoading} from '../actions/appActions';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';

const loadingUuidList: string[] = [];
/**
 * Drop Uuid from array
 * @param id loading uuid
 * @return boolean loading state changes
 */
const dropUuid = (id: string): boolean => {
	const wasLoading = isLoading();
	const idx = loadingUuidList.findIndex((u) => u === id);
	if (idx !== -1) {
		loadingUuidList.splice(idx);
	}
	return wasLoading !== isLoading();
};

/**
 * Add Uuid to array
 * @param id loading uuid
 * @return boolean loading state changes
 */
const addUuid = (id: string): boolean => {
	const wasLoading = isLoading();
	loadingUuidList.push(id);
	return wasLoading !== isLoading();
};

/**
 * have loading uuids
 * @return boolean
 */
const isLoading = (): boolean => {
	return loadingUuidList.length !== 0;
};

/**
 * Dispatched fetch with tracks loading with uuid
 * @param input Fetch Request or string
 * @param options Fetch RequestInit
 */
export const dFetch = (input: RequestInfo, options?: RequestInit | undefined): ThunkResult<Promise<Response>> => async (dispatch: RootThunkDispatch,getState: () => IReduxState) => {
	const id = uuid();
	if (addUuid(id)) {
		dispatch(appLoading(isLoading()));
	}
	try {
		const res = await fetch(input, options);
		if (dropUuid(id)) {
			dispatch(appLoading(isLoading()));
		}
		return Promise.resolve(res);
	} catch (err) {
		if (dropUuid(id)) {
			dispatch(appLoading(isLoading()));
		}
		throw err;
	}
};
