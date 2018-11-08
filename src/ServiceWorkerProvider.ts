import * as React from 'react';

interface IState {
	workerState: string|null;
	updateFunction: null|() => void;
}

interface IProps {

}

class ServiceWorkerProvider extends React.Component<IProps,IState> {
	constructor(props) {
		super(props);
		this.state = {
			updateFunction: null,
			workerState: null,
		};
		this.reloadCallback = this.reloadCallback.bind(this);
		this.runUpdate = this.runUpdate.bind(this);
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
	}
	public componentDidMount() {
		import('./registerServiceWorker' /* webpackChunkName: "register-service-worker" */)
			.then((registerServiceWorker) => registerServiceWorker.default(this.reloadCallback, this.getUpdateFunction));
	}
	public render() {
		return React.cloneElement(React.Children.only(this.props.children), {workerState: this.state.workerState, swCheckUpdate: this.runUpdate});
	}
	private reloadCallback(state: string) {
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
export default ServiceWorkerProvider;