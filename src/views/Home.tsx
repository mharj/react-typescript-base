import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces, WithNamespaces} from 'react-i18next';
import {connect} from 'react-redux';
import {actions, IActions} from '../actions';
import {IState} from '../reducers';

type Props = WithNamespaces & IPropsState & IActions;

class Home extends React.Component<Props, any> {
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

interface IPropsState {
	etag: string | null,
	value: string | null,
}

const mapStateToProps = (state: IState): IPropsState => {
	return {
		etag: state.app.etag,
		value: state.app.value,
	};
};

export default connect<IPropsState>(mapStateToProps,actions)(withNamespaces()<Props>(Home));