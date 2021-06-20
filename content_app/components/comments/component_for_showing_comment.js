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

class ComponentForShowingComment extends Component {
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
		// console.log('COMMENT')
		// console.log(data)

		var base64Image = "data:image/jpeg;base64," + data.user_image
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
								resizeMode: "stretch",
								borderRadius: 100
							}}
						/>
					</View>

					<View style={{
						flex:3,
						marginLeft:30,
					}}>
						<Text style={{fontWeight:'bold', }}>
							{data.user_name}
						</Text>
						<Text>
							{data.comment_text}
						</Text>
					</View>

				</View>
			</View>

			
			
		);
	}

}
	
ComponentForShowingComment.defaultProps = {

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

export default ComponentForShowingComment;