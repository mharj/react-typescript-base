import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {IErrorProps} from '../components/ErrorBoundary';
import {useThunkDispatch} from '../reducers';
import {resetAction} from '../reducers/common';

const ErrorView: React.FC<IErrorProps> = ({onClear, error}) => {
	const {t} = useTranslation();
	const dispatch = useThunkDispatch();
	const handleReset = () => {
		onClear(); // clear error
		dispatch(resetAction()); // reset redux
	};
	return (
		<div>
			<Helmet>
				<title>Error</title>
			</Helmet>
			<div className="App-intro">
				<h1 style={{color: 'red'}}>{t('fatal_error')}</h1>
				<h2>{error ? error.message : null}</h2>
				<button onClick={handleReset}>{t('reset')}</button>
			</div>
		</div>
	);
};

export default ErrorView;
