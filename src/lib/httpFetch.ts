import {HttpClient} from 'mharj-http-client';
import {appLoading} from '../reducers/appReducer';
import {storeConfiguration} from '../configureStore';

const client = HttpClient.getInstance();

client.onLoading((isLoading) => {
	storeConfiguration.store.dispatch(appLoading(isLoading));
});

export const httpFetch = client.fetch;
