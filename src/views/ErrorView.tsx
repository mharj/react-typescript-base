import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doReset} from '../actions/globalActions';
import {IErrorProps} from '../components/ErrorBoundary';
import {ReduxState, RootThunkDispatch} from '../reducers';

type Props = IPropsState & WithTranslation & ActionList;
type ErrorViewProps = IErrorProps;

class ErrorView extends Component<Props> {
	constructor(props: Props) {
		super(props);
		this.handleReset = this.handleReset.bind(this);
	}

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
					<button onClick={this.handleReset}>Reset</button>
				</div>
			</div>
		);
	}

	private handleReset() {
		this.props.onClear(); // clear error
		this.props.doReset(); // reset redux
	}
}

const mapStateToProps = (state: ReduxState, ownProps: ErrorViewProps) => ({
	error: ownProps.error,
	onClear: ownProps.onClear,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ErrorView));
