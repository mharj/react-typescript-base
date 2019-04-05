import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {IActionDispatch} from '../actions';
import {doLogin, doLogout} from '../actions/appActions';
import {IReduxState, RootThunkDispatch} from '../reducers';

interface IState {
	password: string;
	username: string;
}

type Props = WithTranslation & RouteComponentProps & IPropsState & ActionList;

class Login extends React.Component<Props, IState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			password: '',
			username: '',
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}
	public render() {
		const {isLoggedIn, t} = this.props;
		return (
			<div>
				<Helmet>
					<title>{t('login')}</title>
				</Helmet>
				{isLoggedIn ? (
					<div>
						<button onClick={this.handleLogout}>{t('logout')}</button>
					</div>
				) : (
					<div>
						Username: <input name="username" type="text" onChange={this.onChange} value={this.state.username} /> <br />
						Password: <input name="password" type="password" onKeyUp={this.onKeyUp} onChange={this.onChange} value={this.state.password} />
						<br />
						<button onClick={this.handleLogin}>{t('login')}</button>
					</div>
				)}
			</div>
		);
	}
	private handleLogin() {
		this.props
			.doLogin(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	private handleLogout() {
		this.props
			.doLogout()
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	private onChange(e: React.FormEvent<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;
		switch (target.name) {
			case 'username':
				return this.setState({username: target.value});
			case 'password':
				return this.setState({password: target.value});
		}
	}
	private onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
			this.handleLogin();
		}
		return false;
	}
}

// redux state props
const mapStateToProps = (state: IReduxState) => {
	return {isLoggedIn: state.app.isLoggedIn};
};
type IPropsState = ReturnType<typeof mapStateToProps>;

type ActionList = Pick<IActionDispatch, 'doLogin' | 'doLogout'>;
const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			doLogin,
			doLogout,
		},
		dispatch,
	);
// type ActionList = ReturnType<typeof mapDispatchToProps>; // Waiting redux update!
export default withRouter(
	connect<IPropsState>(
		mapStateToProps,
		mapDispatchToProps,
	)(withTranslation()(Login)),
);
