import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import { Svg } from 'expo';
import Node from './Node.js';

export default class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			initialGraph: null,
			graph: null,
			fetchError: false,
			moves: 0,
			done: false,
			negativeNodes: 0
		};
		this.handleBackPress = this.handleBackPress.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.fetchGraph = this.fetchGraph.bind(this);
	}

	fetchGraph(){
		fetch('https://fierce-lake-17439.herokuapp.com/graph')
		.then((res) => {
			if (res.ok){
				res.json()
				.then((json) => {
					console.log(json);
					let counter = 0;
					json.graph.forEach((item) => {
						if (item.money < 0) counter++;
					});

					this.setState({
						graph: JSON.parse(JSON.stringify(json.graph)),
						initialGraph: JSON.parse(JSON.stringify(json.graph)),
						negativeNodes: counter
					});
				})
				.catch(err => {
					this.setState({fetchError: true})
				})
			}
		}).catch(err => {
			this.setState({fetchError: true})
		});
	}

	componentDidMount(){
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		this.fetchGraph();
	}

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress(){
		this.props.goBack();
		return true;
	}

	resetGame(){
		console.log('reset');
		this.setState(prevState => {
			let counter = 0;

			prevState.initialGraph.forEach((item) => {
				if (item.money < 0) counter++;
			});

			return {
				graph: JSON.parse(JSON.stringify(prevState.initialGraph)),
				moves: 0,
				done: false,
				negativeNodes: counter
			}
		})
	}

	render(){
		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				{
					this.state.graph !== null
					? 
					<View style={{flex: 1}}>
						<Svg style={{flex: 1}}>
							{
								this.state.graph.map((item, index) => {
									return (
										<React.Fragment>
											{
												item.connections.map((connection) => {
													return (
														<Svg.Line
															x1={this.props.width/2 + item.x}
															y1={this.props.height/2 + item.y}
															x2={this.props.width/2 + this.state.graph[connection].x}
															y2={this.props.height/2 + this.state.graph[connection].y}
															stroke="#7d7769"
															strokeWidth={3}
														/>
													)
												})
											}
										</React.Fragment>
									)
								})
							}{
								this.state.graph.map((item, index) => {
									return (
										<Node
											graph={this.state.graph}
											index={index}
											width={this.props.width}
											height={this.props.height}
											key={index}
											pressHandler={() => {
												if (this.state.negativeNodes > 0){
													this.setState(prevState => {
														const shallowGraph = [...prevState.graph];
														let negativeNodesCounter = prevState.negativeNodes;

														shallowGraph[index].connections.forEach(nodeIndex => {
															shallowGraph[nodeIndex].money += 1;
															shallowGraph[index].money -= 1;

															if (shallowGraph[nodeIndex].money === 0) negativeNodesCounter--;
															if (shallowGraph[index].money === -1) negativeNodesCounter++;
														});

														return {
															graph: shallowGraph,
															moves: prevState.moves + 1,
															negativeNodes: negativeNodesCounter,
															done: negativeNodesCounter === 0 ? true : false
														}
													});
												}
											}}
										/>
									)
								})
							}
						</Svg>
						{
							this.state.done ? 
								<Text style={{fontSize: 25, position: 'absolute', top: 10, left: 10, padding: 10, backgroundColor: '#92d19e'}}>DONE IN {this.state.moves} MOVES</Text>
							:
								<Text style={{fontSize: 25, position: 'absolute', top: 10, left: 10, padding: 10}}>MOVES: {this.state.moves}</Text>
						}
						<View style={{position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row'}}>
							<TouchableOpacity onPress={this.handleBackPress}>
								<Text style={styles.bottomButtons}>HOME</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.resetGame}>
								<Text style={styles.bottomButtons}>{this.state.done ? 'RETRY' : 'RESET'}</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={styles.bottomButtons} onPress={() => {
									this.setState({
										initialGraph: null,
										graph: null,
										fetchError: false,
										moves: 0,
										done: false,
										negativeNodes: 0
									});
									this.fetchGraph();
								}}>{this.state.done ? 'NEXT' : 'SKIP'}</Text>
							</TouchableOpacity>
						</View>
					</View>
					:
					<ActivityIndicator size="large" color="#000"/>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bottomButtons: {
		backgroundColor: '#000',
		color: '#fff',
		padding: 10,
		margin: 10
	}
});