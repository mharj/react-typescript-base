import React, {Component, FormEvent, Suspense} from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import logo from './logo.svg';
import {IWithNotification, withNotification} from './NotificationProvider';
import {IReduxState} from './reducers';
import {IWithServiceWorker, withServiceWorker} from './ServiceWorkerProvider';
import ErrorView from './views/Error';

// views code split
const Loading = () => <div>Loading!...</div>;
const HomeView = React.lazy(() => import('./views/Home' /* webpackChunkName: "home-view" */));
const LoginView = React.lazy(() => import('./views/Login' /* webpackChunkName: "login-view" */));
const SecretView = React.lazy(() => import('./views/Secret' /* webpackChunkName: "secret-view" */));
const BrokenView = React.lazy(() => import('./views/Broken' /* webpackChunkName: "broken-view" */));

const Home = () => (
	<Suspense fallback={<Loading />}>
		<HomeView />
	</Suspense>
);

const Login = () => (
	<Suspense fallback={<Loading />}>
		<LoginView />
	</Suspense>
);

const Secret = () => (
	<Suspense fallback={<Loading />}>
		<SecretView />
	</Suspense>
);

const Broken = () => (
	<Suspense fallback={<Loading />}>
		<BrokenView />
	</Suspense>
);

type Props = WithTranslation & IPropsState & IWithServiceWorker & IWithNotification;

class App extends Component<Props> {
	constructor(props: Props) {
		super(props);
		this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
		this.handleNotificationRequest = this.handleNotificationRequest.bind(this);
	}

	public render() {
		const {notificationStatus, isLoggedIn, t} = this.props;
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Welcome to React</h1>
					</header>
					<button value="fi-FI" onClick={this.handleChangeLanguage}>
						{t('fin')}
					</button>
					<button value="en-EN" onClick={this.handleChangeLanguage}>
						{t('eng')}
					</button>
					<button value="sv-SV" onClick={this.handleChangeLanguage}>
						{t('sve')}
					</button>
					{notificationStatus === 'default' ? <button onClick={this.handleNotificationRequest}>{t('notification_request')}</button> : null}
					<br />
					{this.props.isLoading ? 'Fetching API data ..' : ''}
					<br />
					{this.props.error ? <h2 style={{color: 'red'}}>Error: {this.props.error}</h2> : null}
					<br />
					<div>
						<ErrorBoundary onError={ErrorView}>
							<div>
								<Link to="/">
									<button>{t('home')}</button>
								</Link>
								<Link to="/login">
									<button>{t('login')}</button>
								</Link>
								<Link to="/secret">
									<button disabled={isLoggedIn ? false : true}>{t('secret')}</button>
								</Link>
								<Link to="/broken">
									<button>{t('broken')}</button>
								</Link>
							</div>
							<br />
							<Switch>
								<Route exact={true} path="/" component={Home} />
								<Route exact={true} path="/login" component={Login} />
								<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} />
								<Route exact={true} path="/broken" component={Broken} />
							</Switch>
						</ErrorBoundary>
					</div>
					<br />
					<b>
						Service Worker status: {this.props.serviceWorkerState} <button onClick={this.props.serviceWorkerUpdate}>Check updates</button>
					</b>
				</div>
			</Router>
		);
	}
	private handleChangeLanguage(event: FormEvent<HTMLButtonElement>) {
		const target = event.currentTarget;
		this.props.i18n.changeLanguage(target.value);
	}
	private async handleNotificationRequest() {
		try {
			await this.props.requestNotification();
		} catch (err) {
			// ignore
		}
	}
}

// redux state props
const mapStateToProps = (state: IReduxState) => {
	return {
		error: state.app.error,
		isLoading: state.app.isLoading,
		isLoggedIn: state.app.isLoggedIn,
	};
};
type IPropsState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(withTranslation()(withServiceWorker(withNotification(App))));
