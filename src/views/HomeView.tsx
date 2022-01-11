import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {getHome} from '../actions/demoActions';
import {useSelector, useThunkDispatch} from '../reducers';

const HomeView: React.FC = () => {
	const {t} = useTranslation();
	const dispatch = useThunkDispatch();
	const {todo} = useSelector((state) => ({
		todo: state.demo.todo,
	}));
	useEffect(() => {
		dispatch(getHome());
	}, [dispatch]);
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
};

export default HomeView;
