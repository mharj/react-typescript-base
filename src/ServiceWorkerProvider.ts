import * as React from 'react';
import {STATUS as WORKER_STATUS} from './registerServiceWorker';

interface IState {
	workerState: WORKER_STATUS | null;
	updateFunction: null | any;
}

interface IProps {
	children: React.ReactNode;
}
export interface IServiceWorkerProviderProps {
	workerState: WORKER_STATUS | null;
	swCheckUpdate: () => void;
}

export class ServiceWorkerProvider extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			updateFunction: null,
			workerState: null,
		};
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
		const childProps: IServiceWorkerProviderProps = {
			swCheckUpdate: this.runUpdate,
			workerState: this.state.workerState,
		}
		return React.cloneElement(React.Children.only(this.props.children), childProps) as React.ReactElement<IServiceWorkerProviderProps>;
	}
	private onServiceStateChange(state: WORKER_STATUS) {
		this.setState({
			workerState: state,
		});
	}
	private getUpdateFunction(callback: () => void) {
		this.setState({
			updateFunction: callback,
		});
	}
	private runUpdate() {
		if (this.state.updateFunction) {
			this.state.updateFunction();
		}
	}
}
