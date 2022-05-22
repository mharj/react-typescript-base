import React, {createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
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

export const useServiceWorker: () => IWithServiceWorker = () => {
	return useContext(WorkerContext);
};

export const ServiceWorkerConsumer = WorkerContext.Consumer;
const Provider = WorkerContext.Provider;

export function withServiceWorker<P extends IWithServiceWorker>(
	WrappedComponent: React.ComponentType<P>,
): FunctionComponent<Omit<P, keyof IWithServiceWorker>> {
	return function Wrapper(props) {
		return <ServiceWorkerConsumer>{(value) => <WrappedComponent {...(props as P)} {...value} />}</ServiceWorkerConsumer>;
	};
}

export const ServiceWorkerProvider: React.FC<IProps> = ({children}) => {
	const [serviceWorkerState, setServiceWorkerState] = useState<WORKER_STATUS | undefined>();
	const serviceWorkerUpdate = useCallback(() => {
		serviceWorkerRegistration.skipWait();
	}, []);
	useEffect(() => {
		serviceWorkerRegistration.register({onStatus: setServiceWorkerState});
	}, []);
	const contextValue: IWithServiceWorker = {
		serviceWorkerState,
		serviceWorkerUpdate,
	};
	return <Provider value={contextValue}>{children}</Provider>;
};
