import * as React from 'react';

class Broken extends React.Component<any, any> {
	public componentDidMount() {
		throw new Error('Broken: something got broken');
	}
	public render() {
		return <div />;
	}
}

export default Broken;