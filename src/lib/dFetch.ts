import {setAppLoadingAction} from '../actions/appActions';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';

const loadingUrls: string[] = [];
/**
 * Drop Url from array
 * @param url loaded url
 * @return boolean loading state changes
 */
const dropUrl = (url: string): boolean => {
	const wasLoading = isLoading();
	const idx = loadingUrls.findIndex((u) => u === url);
	if (idx !== -1) {
		loadingUrls.splice(idx);
	}
	return wasLoading !== isLoading();
};
/**
 * Add Url ro array
 * @param url loading url
 * @return boolean loading state changes
 */
const addUrl = (url: string): boolean => {
	const wasLoading = isLoading();
	loadingUrls.push(url);
	return wasLoading !== isLoading();
};
/**
 * have loading urls
 * @return boolean
 */
const isLoading = (): boolean => {
	return loadingUrls.length !== 0;
};
/**
 * Dispatched fetch with tracks loading urls
 * @param url Fetch Request or string
 * @param options Fetch RequestInit
 */
export const dFetch = (input: RequestInfo, options?: RequestInit | undefined): ThunkResult<Promise<Response>> => async (dispatch: RootThunkDispatch,getState: () => IReduxState) => {
	const inputString: string = typeof input === 'object' ? JSON.stringify(input) : input;
	if (addUrl(inputString)) {
		dispatch(setAppLoadingAction(isLoading()));
	}
	try {
		const res = await fetch(input, options);
		if (dropUrl(inputString)) {
			dispatch(setAppLoadingAction(isLoading()));
		}
		return Promise.resolve(res);
	} catch (err) {
		if (dropUrl(inputString)) {
			dispatch(setAppLoadingAction(isLoading()));
		}
		throw err;
	}
};
