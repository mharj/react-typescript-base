import React from 'react';
import {Helmet} from 'react-helmet';

const SecretView: React.FC = () => (
	<div>
		<Helmet>
			<title>Secret</title>
		</Helmet>
		<div>some secret stuff</div>
	</div>
);

export default SecretView;
