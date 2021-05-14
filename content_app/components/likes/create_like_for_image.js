import React, { Component } from 'react';
import { 
	TouchableOpacity,
	TextInput,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Icon } from 'react-native-elements';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class CreateLikeForImage extends Component {
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

		return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object

			<View style={styles.outerContainer}>

			  	<TouchableOpacity 
			  		activeOpacity={0.2} 
			  		style={styles.buttonWithoutBG}
					onPress={ () => {

						let setResponseInCurrentImage = (arg) => this.props.set_current_image(arg)
						let redirectToNewImage = () => this.props.navigation.navigate('Individual_Image')

						let redirectToSignIn = () => this.props.navigation.navigate('SignInStack', { screen: 'Login' })
						let setIsSignedInCallback = () => this.props.set_is_signed_in( false )
						let setPhoneNumberCallback = () => this.props.set_phone_number( null )

						axios.post(utils.baseUrl + '/images/create-like-for-image', 
							{
								image_endpoint: this.props.parentDetailsPayload.endpoint,
							})
						.then(function (response) {
							// console.log(response.data) // current blogpost screen data

					    	if (response.status === 401){
								setIsSignedInCallback()
								setPhoneNumberCallback()
								redirectToSignIn()
					    	}
							
							// set to current parent object
							setResponseInCurrentImage(response.data)

							// change route to current_blogpost	
							redirectToNewImage()							

						})
						.catch(function (error) {
							console.log(error)

							// using below condition since log spits below line with 401 status code
							if (String(error).split(" ").join("") === 'Error: Request failed with status code 401'.split(" ").join("")){

								setIsSignedInCallback()
								setPhoneNumberCallback()
								redirectToSignIn()

							}

						});						

					}}
				>			
					<Icon
					  // raised
					  name={utils.likeIcon}
					  type='font-awesome'
					  color='#f50'
					  size={30}
					  // reverse={true}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}
	
CreateLikeForImage.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer: {
		width:windowWidth * 0.15,
		height: windowHeight * 0.05,
		// backgroundColor: 'grey',
		position:'absolute',
		bottom:windowHeight * 0.08,
		left:windowWidth * 0.82,
	},
});


export default CreateLikeForImage