import * as React from 'react';

export interface IWithNotification {
	notificationStatus: string | undefined;
	requestNotification: () => Promise<void>;
}

interface IProps {
	children: React.ReactNode;
}

const requestNotification = async (): Promise<void> => {
	if ('Notification' in window) {
		if (Notification.permission === 'granted') {
			return Promise.resolve();
		}
		const permissions = await Notification.requestPermission();
		if (permissions === 'granted') {
			return Promise.resolve();
		}
	}
	return Promise.reject();
};

const initialContext: IWithNotification = {
	notificationStatus: 'Notification' in window ? Notification.permission : undefined,
	requestNotification,
};

const NotificationContext = React.createContext<IWithNotification>(initialContext);

export const NotificationConsumer = NotificationContext.Consumer;
const Provider = NotificationContext.Provider;

export function withNotification<P extends IWithNotification>(
	WrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.FunctionComponent<Omit<P, keyof IWithNotification>> {
	return function Wrapper(props: P) {
		return <NotificationConsumer>{(value) => <WrappedComponent {...props} {...value} />}</NotificationConsumer>;
	};
}

export class NotificationProvider extends React.Component<IProps, IWithNotification> {
	constructor(props: IProps) {
		super(props);
		this.state = initialContext;
		this.handleRequestNotification = this.handleRequestNotification.bind(this);
	}
	public render() {
		const contextValue: IWithNotification = {
			notificationStatus: this.state.notificationStatus,
			requestNotification: this.handleRequestNotification,
		};
		return <Provider value={contextValue}>{this.props.children}</Provider>;
	}
	private async handleRequestNotification() {
		try {
			await requestNotification();
			this.setState({
				notificationStatus: 'Notification' in window ? Notification.permission : undefined,
			});
		} catch (err) {
			this.setState({
				notificationStatus: 'Notification' in window ? Notification.permission : undefined,
			});
			throw err;
		}
	}
}
