import React, {Component, FormEvent, KeyboardEvent} from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {doLogin, doLogout} from '../actions/appActions';
import {IReduxState, RootThunkDispatch} from '../reducers';

type Props = WithTranslation & RouteComponentProps & IPropsState & ActionList;

const initialState = {
	password: '',
	username: '',
};
type State = typeof initialState;

class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = initialState;
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
	private async handleLogin() {
		try {
			await this.props.doLogin(this.state.username, this.state.password);
			this.props.history.push('/');
		} catch (err) {
			// ignore
		}
	}
	private async handleLogout() {
		try {
			await this.props.doLogout();
			this.props.history.push('/');
		} catch (err) {
			// ignore
		}
	}
	private onChange(e: FormEvent<HTMLInputElement>) {
		const target = e.currentTarget;
		switch (target.name) {
			case 'username':
				return this.setState({username: target.value});
			case 'password':
				return this.setState({password: target.value});
		}
	}
	private onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
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
const mapStateToProps = (state: IReduxState) => ({
	isLoggedIn: state.app.isLoggedIn,
});
type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			doLogin,
			doLogout,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(withTranslation()(Login)),
);
