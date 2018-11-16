import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces, WithNamespaces} from 'react-i18next';
import {connect} from 'react-redux';
import {doReset, TDoRest} from '../actions/globalActions';
import {IReduxState, RootThunkDispatch} from '../reducers';

interface IErrorViewProps {
	error: Error;
}

type Props = WithNamespaces & IErrorViewProps & IActionDispatch;

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
					<button onClick={this.props.doReset}>Reset</button>
				</div>
			</div>
		);
	}
}

// action props
interface IActionDispatch {
	doReset: TDoRest;
}
const mapDispatchToProps = (dispatch: RootThunkDispatch):IActionDispatch  => ({
	doReset: () => dispatch(doReset()),
});

const mapStateToProps = (state: IReduxState) => {
	return {};
};

export default connect<any, IActionDispatch>(
	mapStateToProps,
	mapDispatchToProps,
)(withNamespaces()<Props>(ErrorView));
