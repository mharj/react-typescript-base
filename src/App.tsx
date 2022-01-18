import React, {Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {Route, Routes} from 'react-router';
import {HashRouter as Router, Link} from 'react-router-dom';
import './App.css';
import PrivateComponent from './components/PrivateComponent';
import logo from './logo.svg';
import {useNotification} from './NotificationProvider';
import {useServiceWorker} from './ServiceWorkerProvider';
import {useSelector} from './reducers';
import {skipWait} from './serviceWorkerRegistration';
import ErrorBoundary from './components/ErrorBoundary';

// views code split
const Loading = () => <div>Loading!...</div>;
const HomeView = React.lazy(() => import('./views/HomeView' /* webpackChunkName: "home-view" */));
const LoginView = React.lazy(() => import('./views/LoginView' /* webpackChunkName: "login-view" */));
const SecretView = React.lazy(() => import('./views/SecretView' /* webpackChunkName: "secret-view" */));
const BrokenView = React.lazy(() => import('./views/BrokenView' /* webpackChunkName: "broken-view" */));
const ErrorView = React.lazy(() => import('./views/ErrorView' /* webpackChunkName: "error-view" */));

const App: React.FC = () => {
	const {serviceWorkerState, serviceWorkerUpdate} = useServiceWorker();
	const {
		t,
		i18n: {changeLanguage},
	} = useTranslation();
	const {notificationStatus, requestNotification} = useNotification();
	const {error, isLoggedIn, isLoading} = useSelector((state) => ({
		isLoggedIn: state.app.isLoggedIn,
		isLoading: state.app.isLoading,
		error: state.app.error,
	}));
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<button value="fi-FI" onClick={({currentTarget}) => changeLanguage(currentTarget.value)}>
					{t('fin')}
				</button>
				<button value="en-EN" onClick={({currentTarget}) => changeLanguage(currentTarget.value)}>
					{t('eng')}
				</button>
				<button value="sv-SV" onClick={({currentTarget}) => changeLanguage(currentTarget.value)}>
					{t('sve')}
				</button>
				{notificationStatus === 'default' ? <button onClick={() => requestNotification()}>{t('notification_request')}</button> : null}
				<br />
				{isLoading ? 'Fetching API data ..' : ''}
				<br />
				{error ? <h2 style={{color: 'red'}}>Error: {error}</h2> : null}
				<br />
				<div>
					<ErrorBoundary onError={ErrorView}>
						<>
							<div>
								<Link to="/">
									<button>{t('home')}</button>
								</Link>
								<Link to="/login">
									<button>{t('login')}</button>
								</Link>
								<Link to="/secret">
									<button disabled={!isLoggedIn}>{t('secret')}</button>
								</Link>
								<Link to="/broken">
									<button>{t('broken')}</button>
								</Link>
							</div>
							<br />
							<Suspense fallback={<Loading />}>
								<Routes>
									<Route path="/" element={<HomeView />} />
									<Route path="/login" element={<LoginView />} />
									<Route path="/secret" element={<PrivateComponent isValid={isLoggedIn} failPath="/login" element={<SecretView />} />} />
									<Route path="/broken" element={<BrokenView />} />
									<Route path="/_error" element={<ErrorView error={new Error('demo error')} onClear={() => console.log('reset')} />} />
								</Routes>
							</Suspense>
						</>
					</ErrorBoundary>
				</div>
				<br />
				<b>
					Service Worker status: {serviceWorkerState} <button onClick={() => serviceWorkerUpdate?.()}>Check updates</button>
					<button onClick={() => skipWait()} disabled={serviceWorkerState !== 'installed'}>
						Install new version
					</button>
					<button onClick={() => window.location.reload()} disabled={serviceWorkerState !== 'activated'}>
						Reload to activate new version
					</button>
				</b>
			</div>
		</Router>
	);
};

export default App;
