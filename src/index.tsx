import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import configureStore from './configureStore';
import i18n from './i18n';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const {store, persistor} = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<I18nextProvider i18n={i18n}>
				<App />
			</I18nextProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
