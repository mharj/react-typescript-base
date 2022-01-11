import React, {Component, ElementType /* ErrorInfo */} from 'react';

export interface IErrorProps {
	error: undefined | Error;
	onClear: () => void;
}

export type Props = {
	onError: ElementType<IErrorProps>;
};

interface IState {
	error: Error | undefined;
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, IState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			error: undefined,
			hasError: false,
		};
		this.handleClear = this.handleClear.bind(this);
	}

	public componentDidCatch(error: Error /*  info: ErrorInfo */) {
		this.setState({
			error,
			hasError: true,
		});
	}

	public render() {
		const ErrorView = this.props.onError;
		if (this.state.hasError) {
			return <ErrorView error={this.state.error} onClear={this.handleClear} />;
		}
		return this.props.children;
	}

	private handleClear() {
		this.setState({
			error: undefined,
			hasError: false,
		});
	}
}
export default ErrorBoundary;
