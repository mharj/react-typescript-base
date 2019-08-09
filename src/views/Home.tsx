import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation, WithTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHome} from '../actions/demoActions';
import {unWrapEtag} from '../lib/etagTools';
import {IReduxState, RootThunkDispatch} from '../reducers';

type Props = WithTranslation & IPropsState & ActionList;

class Home extends Component<Props> {
	public componentDidMount() {
		this.props.getHome().then(() => {
			console.log('async promise done');
		});
	}
	public render() {
		const {t, todo} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<div className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
					<br />
					<h1>
						{t('hello')} Todo {t('example')}
					</h1>
					{todo ? (
						<table style={{marginLeft: 'auto', marginRight: 'auto', border: '1px solid black'}}>
							<tbody>
								<tr>
									<th>{t('todo:id')}:</th>
									<td>{todo.id}</td>
								</tr>
								<tr>
									<th>{t('todo:user_id')}:</th>
									<td>{todo.userId}</td>
								</tr>
								<tr>
									<th>{t('todo:title')}:</th>
									<td>{todo.title}</td>
								</tr>
								<tr>
									<th>{t('todo:completed')}:</th>
									<td>{todo.completed ? t('yes') : t('no')}</td>
								</tr>
							</tbody>
						</table>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IReduxState) => ({
	todo: unWrapEtag(state.demo.todo),
});
type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) =>
	bindActionCreators(
		{
			getHome,
		},
		dispatch,
	);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(Home));
