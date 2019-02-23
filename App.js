import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Home from './components/Home.js';
import Game from './components/Game.js';

export default class App extends React.Component {
	state = { 
		width: 50,
		height: 50,
		isPlaying: false
	};

	playButtonPressed = () => {
		console.log("Pressed");
		this.setState({isPlaying: true});
	}

	render() {
		return (
			<View style={styles.container} onLayout={(e) => {
					console.log(e.nativeEvent);
					this.setState({
						width: e.nativeEvent.layout.width,
						height: e.nativeEvent.layout.height
					});
				}}>
				<StatusBar hidden/>
				{
					this.state.isPlaying ?
					<Game width={this.state.width} height={this.state.height} goBack={() => {this.setState({isPlaying: false})}}/>
					:
					<Home width={this.state.width} height={this.state.height} playButtonPressed={this.playButtonPressed}/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
