import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {doReset} from '../actions/globalActions';
import {IReduxState, RootThunkDispatch} from '../reducers';

interface IErrorViewProps {
	error: Error;
}

type Props = IPropsState & WithTranslation & IErrorViewProps & ActionList;

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

const mapStateToProps = (state: IReduxState) => {
	return {};
};
type IPropsState = ReturnType<typeof mapStateToProps>;


const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			doReset,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect<IPropsState>(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()<Props>(ErrorView));
