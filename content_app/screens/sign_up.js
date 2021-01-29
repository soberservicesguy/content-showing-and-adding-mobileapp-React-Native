import React, {Component} from 'react';
// IMPORT classes to use
import { 
	PermissionsAndroid,
	ImageBackground,
	View,
	StyleSheet, 
	Button,
	Text,
	TouchableOpacity,
	TextInput,
	// TouchableHighlight,
} from "react-native";

// IMPORT connected components
// import {ConnectedSomeComponent} from "../redux_stuff/connected_components";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon } from 'react-native-elements';
import axios from 'axios';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import utils from "../utilities";

import { verify_privilege } from "../handy_functions/"

import { Picker } from '@react-native-picker/picker';

import DocumentPicker from 'react-native-document-picker';


class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

			user_name: '',
			phone_number: '',
			password:'',
			user_image: '',

			privileges_selected:'',

			switchScreen: false,

		}
	}

	componentDidMount(){
	}


	signup_and_get_privileges(){
		// upload file with axios request
		const formData = new FormData()
		formData.append('user_name', this.state.user_name)
		formData.append('password', this.state.password)
		formData.append('phone_number', this.state.phone_number)
		formData.append('privileges_selected', this.state.privileges_selected)
		formData.append('category', 'avatar')
		formData.append('avatar_image', {uri: this.state.user_image.uri, name: this.state.user_image.name, type: this.state.user_image.type})


		axios.post(utils.baseUrl + '/users/signup-and-get-privileges', formData, {
			onUploadProgress: progressEvent => {
				console.log( 'upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total)*100) + '%' )
			}
		})
		.then(function (response) {
			console.log(`POST rest call response is${JSON.stringify(response.data, null, 1)}`);
			if (response.data.success === true){
				// console.log('yes')
			}

			return response
		})
		.then((response) => {
			if (response.data.success === true){

			// REDIRECT TO LOGIN
				this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			} else {
				console.log('user sign up failed, try again')
			}
		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	render() {

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Login', {
				itemId: 86,
				otherParam: 'anything you want here',
			})
			// const payload_from_previous_screen = this.props.navigation.route.params 

		} else {

			return(
				<View style={styles.screenContainer}>
					
					<View style={styles.buttonContainer}>
						<Button 
							title={'SIGN UP WITH FACEBOOK'}
							style={styles.roundButton} 
							onPress={() => null} 
							activeOpacity={0.2}
						/>
					</View>

				
					<View style={styles.orContainer}>
						<View style={styles.leftBar}>
						</View>

						<View style={styles.orTextChild}>
							<Text style={styles.orText}>
								OR
							</Text>
						</View>

						<View style={styles.rightBar}>
						</View>
					</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your user name"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) =>  this.setState(prev => ({...prev, user_name: value})) }
						/>
					</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="PHONE_NUMBER"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) =>  this.setState(prev => ({...prev, phone_number: value})) }
						/>
					</View>

					<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type PASSWORD"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) =>  this.setState(prev => ({...prev, password: value})) }
						/>
					</View>

					<View style={styles.textinputContainer}>
						<Button 
							title={'USER_IMAGE'}
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
									this.setState(prev => ({...prev, user_image: res}))

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

					<View style={{marginTop: 10,}}>

						<Text id="demo-simple-select-outlined-label" style={{fontSize:20}}>
							Select Privileges To Use
						</Text>

						<Picker
							selectedValue={this.state.privileges_selected}
							style={{height: 50, width: 100}}
							onValueChange={(itemValue, itemIndex) => {

								// console logging selected file from menu
								console.log( event.target.value ) // gives first file
								// setState method with event.target.files[0] as argument
								this.setState(prev => ({...prev, privileges_selected: itemValue}))

							}}
						>
							<Picker.Item label="None" value={null} />
							<Picker.Item label="Basic (commenting, liking content)" value="Basic" />
							<Picker.Item label="Uploading Images" value="Images control" />
							<Picker.Item label="Uploading Videos" value="Videos control" />
							<Picker.Item label="Uploading Blogposts" value="Blogposts control" />
							<Picker.Item label="All Privileges" value="Total control" />
						</Picker>

					</View>


					<Button  
						title={'Already have an account ?'}
						onPress={() => {}} 
						style={styles.buttonWithoutBG}
					/>
						
					<Button 
						title={'Create Account'}
						style={styles.lowerButton} 
						activeOpacity={0.2}
						onPress={ () => this.signup_and_get_privileges() }
					/>
									
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
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
})

export default SignUpScreen