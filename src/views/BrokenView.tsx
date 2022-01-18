import React, {useEffect} from 'react';

const BrokenView: React.FC = () => {
	useEffect(() => {
		throw new Error('Broken: something got broken');
	});
	return <div />;
};

export default BrokenView;
