import * as React from 'react';
import {STATUS as WORKER_STATUS} from './registerServiceWorker';

interface IState {
	serviceWorkerState: WORKER_STATUS | null;
	serviceWorkerUpdate: null | any;
}

interface IProps {
	children: React.ReactNode;
}

const initialContext: IState = {
	serviceWorkerState: null,
	serviceWorkerUpdate: null,
};

const WorkerContext = React.createContext(initialContext);

export const ServiceWorkerConsumer = WorkerContext.Consumer;

export class ServiceWorkerProvider extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = initialContext;
		this.onServiceStateChange = this.onServiceStateChange.bind(this);
		this.runUpdate = this.runUpdate.bind(this);
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
	}
	public componentDidMount() {
		import('./registerServiceWorker' /* webpackChunkName: "register-service-worker" */).then((registerServiceWorker) =>
			registerServiceWorker.default(this.onServiceStateChange, this.getUpdateFunction),
		);
	}
	public render() {
		const contextValue: IState = {
			serviceWorkerState: this.state.serviceWorkerState,
			serviceWorkerUpdate: this.runUpdate,
		}
		return (
			<WorkerContext.Provider value={contextValue}>
				{this.props.children}
			</WorkerContext.Provider>
		);
	} 
	private onServiceStateChange(state: WORKER_STATUS) {
		this.setState({
			serviceWorkerState: state,
		});
	}
	private getUpdateFunction(callback: () => void) {
		this.setState({
			serviceWorkerUpdate: callback,
		});
	}
	private runUpdate() {
		if (this.state.serviceWorkerUpdate) {
			this.state.serviceWorkerUpdate();
		}
	}
}
