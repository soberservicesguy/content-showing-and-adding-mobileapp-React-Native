import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/image"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ComponentForShowingLike extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {

		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		const data = this.props.componentData // data being plugged from parent flatlist		

		return (
			<View style={{
				width:windowWidth,
				alignItems:'center', 
			}}>
				
				<View style={styles.outerContainer}>

					<View style={{
						flex:1,
					}}>
						<Image  alt="" 
							source={{uri: "data:image/jpeg;base64," + data.user_image}} 
							style={{
								width:80, 
								height:80, 
								resizeMode: "cover",
								borderRadius: 100
							}}
						/>
					</View>

					<View style={{
						flex:3,
					}}>
						<Text style={{fontWeight:'bold', marginLeft:30,}}>
							{data.user_name}
						</Text>
					</View>

				</View>
			</View>
		);
	}
}
	
ComponentForShowingLike.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		width: windowWidth * 0.7,
		display:'flex',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent: 'center',
		height:100,
		alignSelf:'center',
	},
});


export default ComponentForShowingLike;