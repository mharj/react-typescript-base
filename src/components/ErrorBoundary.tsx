import React, {Component, ElementType, ErrorInfo} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';

export interface IErrorProps {
	error: undefined | Error;
}

export type Props = RouteComponentProps & {
	onError: ElementType<IErrorProps>;
};

interface IState {
	error: Error | undefined;
	hasError: boolean;
	location: any;
}

class ErrorBoundary extends Component<Props, IState> {
	public static getDerivedStateFromProps(props: Props, state: IState) {
		if (props.history.location !== state.location) {
			return {
				error: null,
				hasError: false,
				location: props.history.location,
			};
		} else {
			return null;
		}
	}

	constructor(props: Props) {
		super(props);
		this.state = {
			error: undefined,
			hasError: false,
			location: props.history.location,
		};
	}

	public componentDidCatch(error: Error, info: ErrorInfo) {
		this.setState({
			error,
			hasError: true,
		});
	}

	public render() {
		const ErrorView = this.props.onError;
		if (this.state.hasError) {
			return <ErrorView error={this.state.error} />;
		}
		return this.props.children;
	}
}
export default withRouter(ErrorBoundary);
