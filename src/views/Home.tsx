import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';
import {connect} from 'react-redux';
import actions from '../actions';

interface IProps {
	t: ()=> void,
}

class Home extends React.Component<any, IProps> {
	public componentDidMount() {
		// this.props.getHome(this.props.etag);
	}
	public render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<div className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
					<br />
					{this.props.value ? (
						<div>
							{t('hello')} {t(this.props.value)}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		etag: state.app.etag,
		value: state.app.value,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withNamespaces()(Home));