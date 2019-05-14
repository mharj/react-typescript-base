import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

type IPrivateRoute = RouteProps & {
	isValid: boolean,
	failPath: string,
	component: React.ElementType,
}

const PrivateRoute: React.FunctionComponent<IPrivateRoute> = ({component: Component, ...routeProps}) => (
	<Route
		{...routeProps}
		render={(props) => {
			return routeProps.isValid ? <Component {...props} /> : <Redirect to={routeProps.failPath ? routeProps.failPath : '/'} />;
		}}
	/>
);
export default PrivateRoute;
