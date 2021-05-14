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

import { Consumer } from "../../screens/video"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';

class ComponentForShowingVideo extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.dataPayloadFromParent.image_main_filepath

		axios.get(`${utils.baseUrl}/video/get-image`, 
			{
				params: {
					image_object_id: image_object_id
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){
		    	this.setState({ image_src: "data:image/jpeg;base64," + response.data.image})
	    	}

		})
		.catch((err) => {
			console.log(err)
		})


	}


	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_thumbnail

		return (
			<View style={styles.outerContainer}>

				<View style={styles.imageContainer}>
					<Image 
						// source={base64Image}
						// source={utils.image}
						source={{uri: this.state.image_src}}
						style={{
							width:'100%', 
							height:windowHeight * 0.3, 
							resizeMode: "stretch"
						}}
					/>
				</View>

				<View style={styles.iconStyle}>
					<Icon
						// raised
						name={utils.playButtonIcon}
						type='font-awesome'
						iconStyle='Outlined'
						color={utils.orange}
						size={windowWidth * 0.15}
						// onPress={() => console.log('hello')} 
						// reverse={true}
					/>
				</View>

				<View>
					<Text style={styles.title}>
						Title: { data.title }
					</Text>
				</View>

				<View style={styles.attributesContainer}>
					<View style={styles.iconAndTextContainer}>
						<Icon
						  // raised
						  name={utils.categoryIcon}
						  type='font-awesome'
						  iconStyle='Outlined'
						  color={utils.mediumGrey}
						  size={22}
						  // onPress={() => console.log('hello')} 
						  // reverse={true}
						/>
						<Text style={styles.categoryText}>
							Category: { data.category }
						</Text>
					</View>

					<View style={styles.iconAndTextContainer}>
						<Icon
						  // raised
						  name={utils.timestampIcon}
						  type='font-awesome'
						  iconStyle='Outlined'
						  color={utils.mediumGrey}
						  size={22}
						  // onPress={() => console.log('hello')} 
						  // reverse={true}
						/>					
						<Text style={styles.timestampText}>
							{ data.timestamp_of_uploading }
						</Text>
					</View>

				</View>
			</View>
		);
	}
}
	
ComponentForShowingVideo.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		height:windowHeight * 0.4,
		width: windowWidth,
		alignSelf:'center',
		// backgroundColor: '#000000',
		// alignItems: 'center',
		// borderBottomWidth: 1,
		// borderBottomColor:utils.dimWhite,

	},

	attributesContainer:{
		flexDirection:'row',
		justifyContent: 'space-between'
	},

// icon and text
	iconAndTextContainer:{
		flexDirection: 'row',
	},
	iconStyle:{
		position:'absolute',
		top:windowHeight * 0.1,
		left:windowWidth * (0.5 - 0.15/2),
		height:windowWidth * 0.15,
	},

// texts style
	title:{
		fontSize:15,
		fontWeight:'bold',
		textAlign:'center',
		marginTop: windowHeight * 0.01,
		// width:'100%',
		// backgroundColor: '#000000'
	},
	timestampText:{
		marginLeft:10,
		fontSize:15,
	},
	categoryText:{
		marginLeft:10,
		fontSize:15,
	},
});


export default ComponentForShowingVideo;