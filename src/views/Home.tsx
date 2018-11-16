import * as React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces, WithNamespaces} from 'react-i18next';
import {connect} from 'react-redux';
import {getHome, TGetHome} from '../actions/appActions';
import {IToDo} from '../interfaces/todo';
import {IReduxState, RootThunkDispatch} from '../reducers';

type Props = WithNamespaces & IPropsState & IActionDispatch;

class Home extends React.Component<Props, any> {
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

// redux state props
interface IPropsState {
	todo: IToDo | null;
}

const mapStateToProps = (state: IReduxState): IPropsState => {
	return {
		todo: state.app.todo,
	};
};

// action props
interface IActionDispatch {
	getHome: TGetHome;
}

const mapDispatchToProps = (dispatch: RootThunkDispatch): IActionDispatch => ({
	getHome: () => dispatch(getHome()),
});

export default connect<IPropsState, IActionDispatch>(
	mapStateToProps,
	mapDispatchToProps,
)(withNamespaces()<Props>(Home));
