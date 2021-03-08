import React, {Component, createContext, FunctionComponent, ReactNode} from 'react';
import {STATUS as WORKER_STATUS} from './serviceWorkerRegistration';
import {listen} from './serviceWorkerRegistration';

export interface IWithServiceWorker {
	serviceWorkerState: WORKER_STATUS | undefined;
	serviceWorkerUpdate: (() => void) | undefined;
	serviceWorkerSkipWait: (() => void) | undefined;
}

interface IProps {
	children: ReactNode;
	listener: typeof listen;
}

const initialContext: IWithServiceWorker = {
	serviceWorkerState: undefined,
	serviceWorkerUpdate: undefined,
	serviceWorkerSkipWait: undefined,
};

const WorkerContext = createContext<IWithServiceWorker>(initialContext);

export const ServiceWorkerConsumer = WorkerContext.Consumer;
const Provider = WorkerContext.Provider;

export function withServiceWorker<P extends IWithServiceWorker>(
	WrappedComponent: React.ComponentType<P>,
): FunctionComponent<Omit<P, keyof IWithServiceWorker>> {
	return function Wrapper(props) {
		return <ServiceWorkerConsumer>{(value) => <WrappedComponent {...(props as P)} {...value} />}</ServiceWorkerConsumer>;
	};
}

export class ServiceWorkerProvider extends Component<IProps, IWithServiceWorker> {
	constructor(props: IProps) {
		super(props);
		this.state = initialContext;
		this.onServiceStateChange = this.onServiceStateChange.bind(this);
		this.runUpdate = this.runUpdate.bind(this);
		this.skipWait = this.skipWait.bind(this);
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
		this.getSkipWaitFunction = this.getSkipWaitFunction.bind(this);
	}
	public componentDidMount() {
		this.props.listener({
			checkUpdate: this.getUpdateFunction,
			onStatusUpdate: this.onServiceStateChange,
			skipWait: this.getSkipWaitFunction,
		});
	}
	public render() {
		const contextValue: IWithServiceWorker = {
			serviceWorkerState: this.state.serviceWorkerState,
			serviceWorkerUpdate: this.runUpdate,
			serviceWorkerSkipWait: this.skipWait,
		};
		return <Provider value={contextValue}>{this.props.children}</Provider>;
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
	private getSkipWaitFunction(callback: () => void) {
		this.setState({
			serviceWorkerSkipWait: callback,
		});
	}
	private runUpdate() {
		if (this.state.serviceWorkerUpdate) {
			this.state.serviceWorkerUpdate();
		}
	}
	private skipWait() {
		if (this.state.serviceWorkerSkipWait) {
			this.state.serviceWorkerSkipWait();
		}
	}
}
