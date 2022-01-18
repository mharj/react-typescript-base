import {setHttpFetchStore} from './lib/httpFetch';
import {StoreType} from './configureStore';

/**
 * Use this to link current redux store to needed callbacks
 */
export function setupStoreLinks(store: StoreType) {
	setHttpFetchStore(store);
}
