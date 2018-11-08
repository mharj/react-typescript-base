import * as React from 'react';

interface IState {
	workerState: string|null;
	updateFunction: null|any;
}

interface IProps {
	children: React.ReactNode;
}
/**
 * TODO: build callback function type
 */
export class ServiceWorkerProvider extends React.Component<IProps,IState> {
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
		import('./registerServiceWorker' /* webpackChunkName: "register-service-worker" */)
			.then((registerServiceWorker) => registerServiceWorker.default(this.onServiceStateChange, this.getUpdateFunction));
	}
	public render() {
		return React.cloneElement(React.Children.only(this.props.children), {workerState: this.state.workerState, swCheckUpdate: this.runUpdate});
	}
	private onServiceStateChange(state: string) {
		this.setState({
			workerState: state,
		});
	}
	private getUpdateFunction(callback: ()=>void) {
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
