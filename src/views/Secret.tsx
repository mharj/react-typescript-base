import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';

class Secret extends React.Component<any, any> {
	public render() {
		return (
			<div>
				<Helmet>
					<title>Secret</title>
				</Helmet>
				<div>some secret stuff</div>
			</div>
		);
	}
}

export default withNamespaces()(Secret);