import React, {Component} from 'react';

class Broken extends Component {
	public componentDidMount() {
		throw new Error('Broken: something got broken');
	}
	public render() {
		return <div />;
	}
}

export default Broken;
