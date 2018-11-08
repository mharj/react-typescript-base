import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces, WithNamespaces} from 'react-i18next';

interface IErrorViewProps {
	error: Error;
}

type Props = WithNamespaces & IErrorViewProps;

class ErrorView extends React.Component<Props, any> {
	public render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Error</title>
				</Helmet>
				<div className="App-intro">
					<h1 style={{color: 'red'}}>{t('fatal_error')}</h1>
					<h2>{this.props.error.message}</h2>
				</div>
			</div>
		);
	}
}

export default withNamespaces()(ErrorView);
