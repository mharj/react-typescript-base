import React, {Suspense} from 'react';
import './index.css';
import {ServiceWorkerProvider} from './ServiceWorkerProvider';

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore", webpackPreload: true */),
	import('react-dom/client' /* webpackChunkName: "react-dom-client", webpackPreload: true */),
	import('react-redux' /* webpackChunkName: "redux", webpackPreload: true */),
	import('redux-persist/integration/react' /* webpackChunkName: "persist", webpackPreload: true */),
	import('./App' /* webpackChunkName: "app", webpackPreload: true */),
	import('./reportWebVitals' /* webpackChunkName: "web-vitals", webpackPreload: true */),
	import('react-helmet-async' /* webpackChunkName: "helmet", webpackPreload: true */),
	import('./i18n' /* webpackChunkName: "i18n", webpackPreload: true */),
	import('./views/ErrorView' /* webpackChunkName: "error-view", webpackPreload: true */),
	import('./components/ErrorBoundary' /* webpackChunkName: "error-boundary-component", webpackPreload: true */),
]).then((loaded) => {
	const [configureStore, ReactDOM, Redux, Persist, AppModule, reportWebVitals, Helmet] = loaded;
	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
	const {store, persistor} = configureStore;
	const App = AppModule.default;
	const HelmetProvider = Helmet.HelmetProvider;
	root.render(
		<React.StrictMode>
			<ServiceWorkerProvider>
				<Redux.Provider store={store}>
					<Persist.PersistGate loading={null} persistor={persistor}>
						<Suspense fallback={<div>Loading</div>}>
							<HelmetProvider>
								<App />
							</HelmetProvider>
						</Suspense>
					</Persist.PersistGate>
				</Redux.Provider>
			</ServiceWorkerProvider>
		</React.StrictMode>,
	);
	// If you want to start measuring performance in your app, pass a function
	// to log results (for example: reportWebVitals.default(console.log))
	// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
	reportWebVitals.default();
});
