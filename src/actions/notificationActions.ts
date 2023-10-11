import {PUBLIC_VAPID_KEY} from '../env';
import {ThunkResult} from '../reducers';
import {appError} from '../reducers/common';

const sendSubscription =
	(_subscription: PushSubscription): ThunkResult<Promise<void>> =>
	// eslint-disable-next-line require-await
	async (_dispatch) => {
		console.log('push API sendSubscription');
		throw new Error('Push notification client register URL is not configured!');
		/* return httpFetch('/api/notifications/subscribe', {
		// TODO: change to API server to register push clients
		body: JSON.stringify(subscription),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	}); */
	};

export const doNotificationSubscribe = (): ThunkResult<Promise<void>> => async (dispatch) => {
	if ('serviceWorker' in navigator && Notification.permission === 'granted') {
		try {
			if (!PUBLIC_VAPID_KEY) {
				throw new Error('no push notification VAPID provided');
			}
			const registration = await navigator.serviceWorker.ready;
			if (!registration.pushManager) {
				// Push manager unavailable.
				return;
			}
			const existedSubscription = await registration.pushManager.getSubscription();
			if (existedSubscription === null) {
				// No push API subscription detected, make a request.
				const newSubscription = await registration.pushManager.subscribe({
					applicationServerKey: PUBLIC_VAPID_KEY,
					userVisibleOnly: true,
				});
				await dispatch(sendSubscription(newSubscription));
			} else {
				// Existed push API subscription detected.
				await dispatch(sendSubscription(existedSubscription));
			}
		} catch (err: unknown) {
			dispatch(appError(err));
		}
	}
};
