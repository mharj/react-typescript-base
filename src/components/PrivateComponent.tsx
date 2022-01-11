import React from 'react';
import {Navigate} from 'react-router';

interface Props {
	isValid: boolean;
	element: JSX.Element;
	failPath: string;
}

const PrivateComponent: React.FC<Props> = ({isValid, element, failPath}) => {
	return isValid ? element : <Navigate to={failPath} />;
};

export default PrivateComponent;
