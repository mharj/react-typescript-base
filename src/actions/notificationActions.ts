import {Action} from 'redux';
import {PUBLIC_VAPID_KEY} from '../env';
// import {dFetch} from '../lib/dFetch';
import {IReduxState, RootThunkDispatch, ThunkResult} from '../reducers';
import { appError } from './appActions';


const sendSubscription = (subscription: PushSubscription): ThunkResult<Promise<Action>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
    console.log('push API sendSubscription');
    throw new Error('Push notification client register URL is not configured!')
	/* return dispatch(
		dFetch('/api/notifications/subscribe', { // TODO: change to API server to register push clients
			body: JSON.stringify(subscription),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}),
	); */
};

export const doNotificationSubscribe = (): ThunkResult<Promise<Action | void>> => async (dispatch: RootThunkDispatch, getState: () => IReduxState) => {
	console.log('push API doNotificationSubscribe');
	if ('serviceWorker' in navigator && Notification.permission === 'granted') {
		try {
			if (!PUBLIC_VAPID_KEY) {
				throw new Error('no push notification VAPID provided');
			}
			const registration = await navigator.serviceWorker.ready;
			if (!registration.pushManager) {
				console.log('Push manager unavailable.');
				return Promise.resolve();
			}
			const existedSubscription = await registration.pushManager.getSubscription();
			if (existedSubscription === null) {
				console.log('No push API subscription detected, make a request.');
				const newSubscription = await registration.pushManager.subscribe({
					applicationServerKey: PUBLIC_VAPID_KEY,
					userVisibleOnly: true,
				});
				return dispatch(sendSubscription(newSubscription));
			} else {
				console.log('Existed push API subscription detected.');
				return dispatch(sendSubscription(existedSubscription));
			}
		} catch (err) {
			return dispatch(appError(err.message));
		}
	} else {
		return Promise.resolve();
	}
};