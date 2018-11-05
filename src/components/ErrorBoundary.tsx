import * as PropTypes from 'prop-types';
import * as React from 'react';
import {withRouter} from 'react-router';

class ErrorBoundary extends React.Component<any, any> {
	public static propTypes = {
		onError: PropTypes.func.isRequired,
	}
	public static getDerivedStateFromProps(props: any, state: any) {
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
	constructor(props: any) {
		super(props);
		this.state = {
			error: null,
			hasError: false,
			location: props.history.location,
		};
	}

	public componentDidCatch(error: Error, info: React.ErrorInfo) {
		this.setState({
			error,
			hasError: true,
		});
	}

	public render() {
		const ErrorView = this.props.onError;
		if (this.state.hasError) {
			return (<ErrorView error={this.state.error} />);
		}
		return this.props.children;
	}
}
export default withRouter(ErrorBoundary);