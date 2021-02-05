import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable'; // tslint:disable-next-line
import {register, listen} from './serviceWorkerRegistration';
import React, {Suspense} from 'react';
import './index.css';
import {NotificationProvider} from './NotificationProvider';
import {ServiceWorkerProvider} from './ServiceWorkerProvider';

register();

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore", webpackPreload: true */),
	import('react-dom' /* webpackChunkName: "react-dom", webpackPreload: true */),
	import('react-redux' /* webpackChunkName: "redux", webpackPreload: true */),
	import('redux-persist/integration/react' /* webpackChunkName: "persist", webpackPreload: true */),
	import('./App' /* webpackChunkName: "app", webpackPreload: true */),
	import('./reportWebVitals' /* webpackChunkName: "web-vitals", webpackPreload: true */),
	import('cross-fetch/polyfill' /* webpackChunkName: "fetch", webpackPreload: true */),
	import('./i18n' /* webpackChunkName: "i18n", webpackPreload: true */),
	import('./views/Error' /* webpackChunkName: "error-view", webpackPreload: true */),
	import('./components/ErrorBoundary' /* webpackChunkName: "error-boundary-component", webpackPreload: true */),
]).then((loaded) => {
	const [configureStore, ReactDOM, Redux, Persist, AppModule, reportWebVitals] = loaded;
	const {store, persistor} = configureStore.default();
	const App = AppModule.default;
	ReactDOM.render(
		<ServiceWorkerProvider listener={listen}>
			<Redux.Provider store={store}>
				<Persist.PersistGate loading={null} persistor={persistor}>
					<Suspense fallback={<div>Loading</div>}>
						<NotificationProvider>
							<App />
						</NotificationProvider>
					</Suspense>
				</Persist.PersistGate>
			</Redux.Provider>
		</ServiceWorkerProvider>,
		document.getElementById('root'),
	);
	// If you want to start measuring performance in your app, pass a function
	// to log results (for example: reportWebVitals.default(console.log))
	// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
	reportWebVitals.default();
});
