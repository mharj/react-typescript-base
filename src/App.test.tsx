import {configure, /* mount */} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import i18next from 'i18next';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
// import {MemoryRouter} from 'react-router';
import configureStore from 'redux-mock-store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import ReduxThunk from 'redux-thunk';
import App from './App';
// import Home from './views/Home';

configure({adapter: new Adapter()});

const middlewares = [ReduxThunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
const persistor = persistStore(store);

it('App renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<I18nextProvider i18n={i18next}>
					<App />
				</I18nextProvider>
			</PersistGate>
		</Provider>,
		div,
	);
	ReactDOM.unmountComponentAtNode(div);
});
/* 
// React-loadable is not working with enzyme, wait for solution
it('enzyme views', async () => {
	const wrapper = mount(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<I18nextProvider i18n={i18next}>
					<MemoryRouter initialEntries={['/']}>
						<App />
					</MemoryRouter>
				</I18nextProvider>
			</PersistGate>
		</Provider>,
	);
	const homeView = wrapper.find(Home);
}); */
