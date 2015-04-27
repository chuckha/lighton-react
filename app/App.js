import React from 'react';
import Reflux from 'reflux';
import {LightRow} from './Light/LightRow';

function range(start, stop) {
	return Array.apply(start, Array(stop)).map(function(x, y) { return y; });
};

const AppActions = Reflux.createActions([
	'clickLight',
	'configState'
]);
const AppStore = Reflux.createStore({
	listenables: AppActions,

	getInitialState() {
		return {game: []};
	},
	onConfigState(props) {
		this.xSize = props.xSize;
		this.ySize = props.ySize;
		this.game = range(0, this.ySize).map(y => {
			return range(0, this.xSize).map(x => {
				return {
					x: x,
					y: y,
					state: false
				};
			});
		});
		this.updateState();
	},
	validateIndexes(x, y) {
		return (x >= 0 && x < this.xSize && y >= 0 && y < this.ySize)
	},
	onClickLight(x, y) {
		console.log(x, y)
		if (this.validateIndexes(x , y - 1)) {
			this.game[y - 1][x].on = !this.game[y - 1][x].on;
		}
		if (this.validateIndexes(x + 1, y)) {
			this.game[y][x + 1].on = !this.game[y][x + 1].on;
		}
		if (this.validateIndexes(x , y + 1)) {
			this.game[y + 1][x].on = !this.game[y + 1][x].on;
		}
		if (this.validateIndexes(x - 1 , y)) {
			this.game[y][x - 1].on = !this.game[y][x - 1].on;
		}

		this.game[y][x].on = !this.game[y][x].on;
		this.updateState();
	},
	updateState() {
		this.trigger({game: this.game})
	}

});
const App = React.createClass({
	mixins: [Reflux.listenTo(AppStore, 'callBack', '')],
	callBack(state) {
		this.setState(state);
	},
	componentDidMount() {
		AppActions.configState(this.props);
	},
	getInitialState() {
		return { game: []};
	},
	render() {
		const {game} = this.state;
		return (
			<div id="game">{game.map(lights => <LightRow lights={lights}/>)}</div>
		);
	}
});

export {App,AppActions};