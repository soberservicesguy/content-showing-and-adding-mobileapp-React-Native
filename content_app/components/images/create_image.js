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

import DocumentPicker from 'react-native-document-picker';

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

class CreateImage extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,

			category: '',
			image_filepath: '',
			title: '',
			// endpoint: '',
			// timestamp_of_uploading: '',
			description: '',
			all_tags: '',		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		// const endpoint_params_passed = this.props.match.params

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Individual-Image', {
				itemId: 86,
				otherParam: 'anything you want here',
			})

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<View style={styles.outerContainer}>
					<Button 
						title={'Select Image'}
						style={styles.buttonWithoutBG}
						onPress={async () => {
							try {
								let res = await DocumentPicker.pick({
									type: [
										DocumentPicker.types.images,
									],
								});
								console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
								// setState method with response as argument
								this.setState(prev => ({...prev, image_filepath: res}))

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
								// value='dummy'
								// autoFocus=true
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
								// value='dummy'
								// autoFocus=true
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
								// value='dummy'
								// autoFocus=true
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
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) => this.setState( prev => ({...prev, all_tags: value})) }
							/>
					  	</View>
				  	</View>

					<Button 
						title={'Press To Create Image'}
						style={styles.buttonWithoutBG}
						onPress={ () => {

							let setResponseInCurrentImage = (arg) => this.props.set_current_image(arg)
							let redirectToNewImage = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							// in formData send individual variables and not a complete object
							// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
							const formData = new FormData()
							formData.append('category', this.state.category)
							formData.append('title', this.state.title)
							formData.append('description', this.state.description)
							formData.append('all_tags', this.state.all_tags)
							// formData.append('user_object', user_object) // not needed, since object will be pulled from passport js jwt token
							formData.append('upload_images_by_user', {uri: this.state.image_filepath.uri, name: this.state.image_filepath.name, type: this.state.image_filepath.type})

							axios.post(utils.baseUrl + '/image-uploads/protected-image-upload', formData)
							.then(function (response) {
								// console.log(this.props.user_name)
								console.log(response.data) // current image screen data
								
								// set to current parent object
								setResponseInCurrentImage(response.data.new_image)

								// change route to current_image
								redirectToNewImage()

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
	
CreateImage.defaultProps = {

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


export default CreateImage;