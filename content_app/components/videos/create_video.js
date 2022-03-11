import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

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

		return (
		// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
			<View style={styles.outerContainer}>
				<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>
					Video Upload Section
				</Text>
				<Button 
					title={'Select VIDEO'}
					style={styles.buttonWithoutBG}
					onPress={async () => {
						try {
							let res = await DocumentPicker.pick({
								type: [
									'video/3gpp',
									'video/mpeg',
									'video/mpeg-4',
									'video/mp4',
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

				<View style={{
					display: 'flex',
					flexDirection: 'row',
				}}>

				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type category"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.category}
							onChangeText={ (value) => this.setState( prev => ({...prev, category: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type title"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.title}
							onChangeText={ (value) => this.setState( prev => ({...prev, title: value})) }
						/>
				  	</View>
			  	</View>

				<View style={{
					display: 'flex',
					flexDirection: 'row',
				}}>

				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type description"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.description}
							onChangeText={ (value) => this.setState( prev => ({...prev, description: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type all_tags"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.all_tags}
							onChangeText={ (value) => this.setState( prev => ({...prev, all_tags: value})) }
						/>
				  	</View>
			  	</View>

				<Button
					title={'Press To Create Video'} 
					style={styles.buttonWithoutBG}
					onPress={ () => {

						let setResponseInCurrentVideo = (arg) => this.props.set_current_video(arg)
						let redirectToNewVideo = () => {this.props.navigation.navigate('Individual_Video')}

						let redirectToSignIn = () => this.props.navigation.navigate('SignInStack', { screen: 'Login' })
						let setIsSignedInCallback = () => this.props.set_is_signed_in( false )
						let setPhoneNumberCallback = () => this.props.set_phone_number( null )
						let clearInput = () => this.setState({
							category: '',
							title: '',
							description: '',
							all_tags: '',
							video_filepath: '',
						})

						// in formData send individual variables and not a complete object
						// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
						const formData = new FormData()
						formData.append('category', this.state.category)
						formData.append('title', this.state.title)
						formData.append('description', this.state.description)							
						formData.append('all_tags', this.state.all_tags)
						// formData.append('user_object', user_object) // not needed, since object will be pulled from passport js jwt token
						formData.append('videos_uploaded_by_user', {uri: this.state.video_filepath.uri, name: this.state.video_filepath.name, type: this.state.video_filepath.type})

						axios.post(utils.baseUrl + '/video/create-video-with-user', formData)
						.then(function (response) {
							clearInput()
					    	if (response.status === 401){
								setIsSignedInCallback()
								setPhoneNumberCallback()
								redirectToSignIn()
					    	}
							// console.log(response.data) // current video screen data
							// console.log({response: response.data})
							// set to current parent object
							setResponseInCurrentVideo(response.data)
							// change route to current_video
							redirectToNewVideo()

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
				/>
			</View>
		);			
	}
}
	
CreateVideo.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		alignItems:'center',
		// flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-between', 
		backgroundColor: '#ffffff',
		width: windowWidth
	},

// textinput
	textinputContainer:{
		marginTop: windowHeight * 0.001, // or 30  gap
		marginBottom: windowHeight * 0.001, // or 30  gap
		height: windowHeight * 0.1, // or 100
		width: windowWidth * 0.45,
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		// marginTop:20,
		textAlign:'center',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		// paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},

// create blogpost button
	bottomButton:{
		// marginTop: windowHeight * 0.03,
		width: windowWidth,
		height: windowHeight * 0.06,
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: 'black',
	},
	buttonText:{
		color:'white',
		fontSize:20,
		fontWeight: 'bold',
	},

});


export default CreateVideo;