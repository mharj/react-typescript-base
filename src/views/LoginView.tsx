import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import {doLogin, doLogout} from '../actions/appActions';
import {useSelector, useThunkDispatch} from '../reducers';

const LoginView = () => {
	const nav = useNavigate();
	const {t} = useTranslation();
	const dispatch = useThunkDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const {isLoggedIn} = useSelector((state) => ({
		isLoggedIn: state.app.isLoggedIn,
	}));
	const handleLogin = async () => {
		await dispatch(doLogin(username, password));
		nav('/');
	};
	return (
		<div>
			<Helmet>
				<title>{t('login')}</title>
			</Helmet>
			{isLoggedIn ? (
				<div>
					<button onClick={() => dispatch(doLogout())}>{t('logout')}</button>
				</div>
			) : (
				<div>
					<form>
						Username:{' '}
						<input
							name="username"
							type="text"
							autoComplete="username"
							onChange={({currentTarget}) => setUsername(currentTarget.value || '')}
							value={username}
						/>{' '}
						<br />
						Password:{' '}
						<input
							name="password"
							type="password"
							autoComplete="current-password"
							onKeyUp={(ev) => {
								ev.preventDefault();
								if (ev.key === 'Enter') {
									handleLogin();
								}
							}}
							onChange={({currentTarget}) => setPassword(currentTarget.value || '')}
							value={password}
						/>{' '}
						<br />
						<button onClick={() => handleLogin()}>{t('login')}</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default LoginView;
