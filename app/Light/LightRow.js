import React from 'react';
import {Light} from './Light';

const LightRow = React.createClass({
	render() {
		const {lights} = this.props;
		return (
			<div className="light-row">{lights.map(light => <Light {...light} />)}</div>
		);
	}
});

export {LightRow};