import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doReset} from '../actions/globalActions';
import {IErrorProps} from '../components/ErrorBoundary';
import {IReduxState, RootThunkDispatch} from '../reducers';

type Props = IPropsState & WithTranslation & ActionList;
type ErrorViewProps = IErrorProps;

class ErrorView extends Component<Props> {
	public render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Error</title>
				</Helmet>
				<div className="App-intro">
					<h1 style={{color: 'red'}}>{t('fatal_error')}</h1>
					<h2>{this.props.error ? this.props.error.message : null}</h2>
					<button onClick={this.props.doReset}>Reset</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IReduxState, ownProps: ErrorViewProps) => ({
	error: ownProps.error,
});
type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			doReset,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(ErrorView));
