import React from 'react';
import { Svg } from 'expo';

export default class Node extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: props.value,
			x: props.x,
			y: props.y,
			connections: props.connections
		};
	}

	render(){
		return (
			<React.Fragment>
				<Svg.Circle
					cx={this.props.width/2 + this.props.graph[this.props.index].x}
					cy={this.props.height/2 + this.props.graph[this.props.index].y}
					r={28}
					stroke="#000"
					strokeWidth={3}
					fill={this.props.graph[this.props.index].money < 0 ? "#f85e50" : "#92d19e"}
				/>
				<Svg.Text
					fill="#000"
					x={this.props.width/2 + this.props.graph[this.props.index].x}
					y={this.props.height/2 + this.props.graph[this.props.index].y+10}
					fontSize={30}
					textAnchor="middle"
				>
					{this.props.graph[this.props.index].money}
				</Svg.Text>
				<Svg.Circle
					cx={this.props.width/2 + this.props.graph[this.props.index].x}
					cy={this.props.height/2 + this.props.graph[this.props.index].y}
					r={30}
					fill="transparent"
					onPress={this.props.pressHandler}
				/>
			</React.Fragment>
		);
	}
}
