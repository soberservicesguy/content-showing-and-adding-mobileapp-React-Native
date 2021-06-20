import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/image"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ComponentForShowingImage extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {
		this.getImage()
	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.dataPayloadFromParent.image_filepath._id

		console.log('MAKING REQUEST')
		axios.get(`${utils.baseUrl}/blogpostings/get-image`, 
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

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			console.log('getting image in component')
			this.getImage()

		}

	}


	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_filepath


		return (
			<TouchableOpacity activeOpacity={0.2} style={styles.outerContainer} onPress={() => {
				this.props.set_current_image(data)
				this.props.navigation.navigate('Individual_Image', {image_main_filepath: this.state.image_src})
			}}>
				<ImageBackground 
					source={{uri: this.state.image_src}}
					// source={utils.image} 
					style={{
						// width:windowWidth,
						width:'100%', 
						height:300, 
						resizeMode: "contain"
					}}
				>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{ data.title }
						</Text>
					</View>
					
				</ImageBackground>
			</TouchableOpacity>

		);
	}
}
	
ComponentForShowingImage.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		height:windowHeight * 0.25,
		// width: windowWidth * 0.45,
		width: windowWidth,
		alignSelf:'center',
		marginBottom:140,
		marginLeft: windowWidth * 0.01,
		marginRight: windowWidth * 0.01, 
		// backgroundColor: '#000000',
		// alignItems: 'center',
	},

	textContainer:{
		backgroundColor: '#000000',
		height:windowHeight * 0.05,
		justifyContent: 'center',
		marginTop:windowHeight * ( 0.44 - 0.05 ),
		opacity: 0.75,
	},
	text:{
		color: 'white',
		marginLeft:20,
		fontSize: 18,
		fontWeight:'bold',
		textAlign:'center',
	},
});

export default ComponentForShowingImage;