import React from 'react';
import classNames from 'classnames';
import {AppActions} from '../App';

const Light = React.createClass({
	getInitialState() {
		return {
			on: false
		}
	},
	handleClick() {
		AppActions.clickLight(this.props.x, this.props.y)
	},
	render() {
		let className = classNames('light', {"on-light": this.props.on, "off-light": !this.props.on});
		return (
			<div className={className} onClick={this.handleClick}></div>
		);
	}
});
export {Light};