import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';

interface IPrivateRoute {
	component: any,
	isValid: boolean,
	failPath: string,
	exact: boolean,
	path: string,
}
// React.Component<any, any>
const PrivateRoute = ({component: Component, ...routeProps}:IPrivateRoute) => (
	<Route
		{...routeProps}
		render={(props) => {
			return routeProps.isValid ? <Component {...props} /> : <Redirect to={routeProps.failPath ? routeProps.failPath : '/'} />;
		}}
	/>
);
export default PrivateRoute;