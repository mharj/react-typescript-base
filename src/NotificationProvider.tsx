import React, {Component, ComponentClass, createContext, FunctionComponent, ReactNode, StatelessComponent} from 'react';

export interface IWithNotification {
	notificationStatus: string | undefined;
	requestNotification: () => Promise<void>;
}

interface IProps {
	children: ReactNode;
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

const NotificationContext = createContext<IWithNotification>(initialContext);

export const NotificationConsumer = NotificationContext.Consumer;
const Provider = NotificationContext.Provider;

export function withNotification<P extends IWithNotification>(
	WrappedComponent: ComponentClass<P> | StatelessComponent<P>,
): FunctionComponent<Omit<P, keyof IWithNotification>> {
	return function Wrapper(props: P) {
		return <NotificationConsumer>{(value) => <WrappedComponent {...props} {...value} />}</NotificationConsumer>;
	};
}

export class NotificationProvider extends Component<IProps, IWithNotification> {
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
