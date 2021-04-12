import {HttpClient} from 'mharj-http-client';
import {appLoading} from '../actions/appActions';
import {getStore} from '../configureStore';

// this hooks global loading state updates from HttpClient
const store = getStore();
const client = HttpClient.getInstance();
client.onLoading((isLoading) => {
	store.dispatch(appLoading(isLoading));
});
export const httpFetch = client.fetch;
