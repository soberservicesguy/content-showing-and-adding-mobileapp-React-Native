import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import DocumentPicker from 'react-native-document-picker';

class CreateVideo extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,
			category: '',
			image_thumbnail: '',
			video_filepath: '',
			title: '',
			endpoint: '',
			description: '',
			// timestamp_of_uploading: '',
			all_tags: '',		
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

					<View style={styles.textinputContainer}>
						<Button 
							title={'Select VIDEO FILE From Phone'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									let res = await DocumentPicker.pick({
										type: [
											'video/3gpp',
											'video/mpeg',
											'video/x-msvideo', // go to for all mimetypes https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
										],
									});
									console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// setState method with response as argument
									this.setState(prev => ({...prev, video_filepath: res}))

								} catch (err) {
									if (DocumentPicker.isCancel(err)) {
										// User cancelled the picker, exit any dialogs or menus and move on
									} else {
										console.log(err)
										// throw err;
									}
								}
							}}
						/>
					</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your category"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, category: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your title"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, title: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your description"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, description: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your all_tags"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, all_tags: value})) }
						/>
				  	</View>

					<Button
						title={'Press To Create Video'} 
						style={styles.buttonWithoutBG}
						onPress={ () => {

							let setResponseInCurrentVideo = (arg) => this.props.set_current_video(arg)
							let redirectToNewVideo = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							// in formData send individual variables and not a complete object
							// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
							const formData = new FormData()
							formData.append('category', this.state.category)
							formData.append('title', this.state.title)
							formData.append('description', this.state.description)							
							formData.append('all_tags', this.state.all_tags)
							// formData.append('user_object', user_object) // not needed, since object will be pulled from passport js jwt token
							formData.append('videos_uploaded_by_users', {uri: this.state.video_filepath.uri, name: this.state.video_filepath.name, type: this.state.video_filepath.type})

							axios.post(utils.baseUrl + '/video-uploads/protected-video-upload', formData)
							.then(function (response) {
								console.log(response.data) // current video screen data
								
								// set to current parent object
								setResponseInCurrentVideo(response.data.video_endpoint)

								// change route to current_video
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
	
CreateVideo.defaultProps = {

};

const styles = StyleSheet.create({
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},
	textinputContainer:{
		marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
	outerContainer: {
	},
	bigBlue: {
	},



	textinputContainer:{
		marginTop: windowHeight * 0.05, // or 30  gap
		height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
});


export default CreateVideo;