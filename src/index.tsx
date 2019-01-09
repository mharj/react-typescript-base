import 'react-app-polyfill/ie9'; // tslint:disable-next-line
import * as React from 'react';
import './index.css';
import {ServiceWorkerProvider} from './ServiceWorkerProvider';

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore", webpackPreload: true */),
	import('./i18n' /* webpackChunkName: "i18n", webpackPreload: true */),
	import('react-dom' /* webpackChunkName: "react-dom", webpackPreload: true */),
	import('react-redux' /* webpackChunkName: "redux", webpackPreload: true */),
	import('redux-persist/integration/react' /* webpackChunkName: "persist", webpackPreload: true */),
	import('react-i18next' /* webpackChunkName: "i18next", webpackPreload: true */),
	import('./App' /* webpackChunkName: "app", webpackPreload: true */),
	import('cross-fetch/polyfill' /* webpackChunkName: "fetch", webpackPreload: true */),
])
	.then( (loaded) => {
		const [configureStore, i18n, ReactDOM, Redux, Persist, I18next, App] = loaded;
		const {store, persistor} = configureStore.default();
		ReactDOM.render(
			<Redux.Provider store={store}>
				<Persist.PersistGate loading={null} persistor={persistor}>
					<I18next.I18nextProvider i18n={i18n.default}>
						<ServiceWorkerProvider>
							<App.default />
						</ServiceWorkerProvider>
					</I18next.I18nextProvider>
				</Persist.PersistGate>
			</Redux.Provider>,
			document.getElementById('root') as HTMLElement,
		);
	});
