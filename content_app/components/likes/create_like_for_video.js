import React, { Component } from 'react';
import { 
	TouchableOpacity,
	TextInput,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class CreateLikeForVideo extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			switchScreen: false,
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Individual-Video', {
				itemId: 86,
				otherParam: 'anything you want here',
			})
			// const payload_from_previous_screen = this.props.navigation.route.params 

		} else {

		return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object

				<View style={styles.outerContainer}>

					<Button
						title={'Press To Create Like'}
						style={styles.buttonWithoutBG}
						onPress={ () => {

							let setResponseInCurrentVideo = (arg) => this.props.set_current_video(arg)
							let redirectToNewVideo = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							axios.post(utils.baseUrl + '/videos/create-like-for-video', 
								{
									video_endpoint: this.props.parentDetailsPayload.endpoint,
								})
							.then(function (response) {
								console.log(response.data.endpoint) // current blogpost screen data
								
								// set to current parent object
								setResponseInCurrentVideo(response.data.endpoint)

								// change route to current_blogpost	
								redirectToNewVideo()							

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					/>
				</View>
			);
		}
	}
}
	
CreateLikeForVideo.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default CreateLikeForVideo