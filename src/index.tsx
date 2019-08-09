import 'react-app-polyfill/ie9'; // tslint:disable-next-line
import React, {Suspense} from 'react';
import './index.css';
import {NotificationProvider} from './NotificationProvider';
import {ServiceWorkerProvider} from './ServiceWorkerProvider';

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore", webpackPreload: true */),
	import('react-dom' /* webpackChunkName: "react-dom", webpackPreload: true */),
	import('react-redux' /* webpackChunkName: "redux", webpackPreload: true */),
	import('redux-persist/integration/react' /* webpackChunkName: "persist", webpackPreload: true */),
	import('./App' /* webpackChunkName: "app", webpackPreload: true */),
	import('cross-fetch/polyfill' /* webpackChunkName: "fetch", webpackPreload: true */),
	import('./i18n' /* webpackChunkName: "i18n", webpackPreload: true */),
]).then((loaded) => {
	const [configureStore, ReactDOM, Redux, Persist, App] = loaded;
	const {store, persistor} = configureStore.default();
	ReactDOM.render(
		<Redux.Provider store={store}>
			<Persist.PersistGate loading={null} persistor={persistor}>
				<Suspense fallback={<div>Loading</div>}>
					<ServiceWorkerProvider>
						<NotificationProvider>
							<App.default />
						</NotificationProvider>
					</ServiceWorkerProvider>
				</Suspense>
			</Persist.PersistGate>
		</Redux.Provider>,
		document.getElementById('root') as HTMLElement,
	);
});
