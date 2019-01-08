import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

type IPrivateRoute = RouteProps & {
	isValid: boolean,
	failPath: string,
	component: any,
}

const PrivateRoute = ({component: Component, ...routeProps}:IPrivateRoute) => (
	<Route
		{...routeProps}
		render={(props) => {
			return routeProps.isValid ? <Component {...props} /> : <Redirect to={routeProps.failPath ? routeProps.failPath : '/'} />;
		}}
	/>
);
export default PrivateRoute;
