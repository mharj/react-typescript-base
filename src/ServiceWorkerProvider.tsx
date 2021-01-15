import React, {Component, createContext, FunctionComponent, ReactNode} from 'react';
import {STATUS as WORKER_STATUS} from './serviceWorkerRegistration';

export interface IWithServiceWorker {
	serviceWorkerState: WORKER_STATUS | undefined;
	serviceWorkerUpdate: (() => void) | undefined;
}

interface IProps {
	children: ReactNode;
}

const initialContext: IWithServiceWorker = {
	serviceWorkerState: undefined,
	serviceWorkerUpdate: undefined,
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
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
	}
	public componentDidMount() {
		import('./serviceWorkerRegistration' /* webpackChunkName: "register-service-worker" */).then((registerServiceWorker) =>
			registerServiceWorker.register({
				checkUpdate: this.getUpdateFunction,
				onStatusUpdate: this.onServiceStateChange,
			}),
		);
	}
	public render() {
		const contextValue: IWithServiceWorker = {
			serviceWorkerState: this.state.serviceWorkerState,
			serviceWorkerUpdate: this.runUpdate,
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
	private runUpdate() {
		if (this.state.serviceWorkerUpdate) {
			this.state.serviceWorkerUpdate();
		}
	}
}
