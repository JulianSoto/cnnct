import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';

export default function Home(props){
	return (
		<View>
			<Text style={{fontSize: 40, color: '#fff', position: 'absolute', top: 20, padding: 10, backgroundColor: '#000', alignSelf: 'center'}}>CNNCT</Text>
			<View>
				<Svg height={props.height} width={props.width}>
					<Svg.Circle
						cx={props.width/2}
						cy={props.height/2}
						r={50}
						strokeWidth={3}
						stroke="#000"
						fill="#97d5d4"
					/>
					<Svg.Polygon
						points={`${props.width/2-10},${props.height/2-20} ${props.width/2+20},${props.height/2} ${props.width/2-10},${props.height/2+20}`}
						stroke="#000"
						fill="transparent"
						strokeWidth={3}
					/>
					<Svg.Circle
						cx={props.width/2}
						cy={props.height/2}
						r={50}
						strokeWidth={3}
						fill="transparent"
						onPress={props.playButtonPressed}
					/>
				</Svg>
			</View>
		</View>
	)	
}