import React, {Component} from 'react';

class Broken extends Component {
	public componentDidMount(): void {
		throw new Error('Broken: something got broken');
	}

	public render(): JSX.Element {
		return <div />;
	}
}

export default Broken;
