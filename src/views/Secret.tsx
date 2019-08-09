import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';

class Secret extends Component<WithTranslation> {
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

export default withTranslation()(Secret);
