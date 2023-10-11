import {HttpClient} from 'mharj-http-client';
import {appLoading} from '../../reducers/appReducer';
import {store} from '../../configureStore';

const client = HttpClient.getInstance();

client.onLoading((isLoading) => {
	store.dispatch(appLoading(isLoading));
});

export const httpFetch = client.fetch;
