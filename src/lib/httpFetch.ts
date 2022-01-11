import {HttpClient} from 'mharj-http-client';
import {appLoading} from '../actions/appActions';
import {StoreType} from '../configureStore';

// this hooks global loading state updates from HttpClient
let store: StoreType | undefined;
const client = HttpClient.getInstance();

export function setHttpFetchStore(newStore: StoreType) {
	store = newStore;
}

client.onLoading((isLoading) => {
	store?.dispatch(appLoading(isLoading));
});

export const httpFetch = client.fetch;
