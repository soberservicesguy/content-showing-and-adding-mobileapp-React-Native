import React, {Component} from 'react';
// IMPORT classes to use
import { 
	PermissionsAndroid,
	ImageBackground,
	View,
	StyleSheet, 
	// Button,
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


class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {

			phone_number: '',
			password:'',

		}
	}

	componentDidMount(){

	}

	make_request_to_protected_route(){

		axios.get(utils.baseUrl + '/users/protected')
		.then(function (response) {
			if (response.data.success === true){

			} else {
				console.log('not authorized')
			}

		})
		.catch(function (error) {
			// console.log(error);
		});	
	}

	login_and_get_jwt_token_and_privileges(){

		let setIsSignedInCallback = () => this.props.set_is_signed_in( true )
		let setPhoneNumberCallback = () => this.props.set_phone_number( this.state.phone_number )
		let verifyPrivilegesCallback = (response) => verify_privilege(this, response.data.privileges)

		console.log('MAKING REQUEST')
		axios.post(utils.baseUrl + '/users/login', 
			{
				phone_number:this.state.phone_number, 
				password:this.state.password
			}
		)
		.then(function (response) {
			// console.log('response')
			// console.log(response)
			if (response.data.success === true){

				try{

					axios.defaults.headers.common['Authorization'] = response.data.token				
					
					setIsSignedInCallback()
					setPhoneNumberCallback()
					verifyPrivilegesCallback(response)

				} catch (err){
					console.log(err)
				}

			} else {
				console.log('couldnt login')
			}

		})
		.catch(function (error) {
			console.log(error);
		});	
	}

	render() {
		return(
			<KeyboardAwareScrollView>
				<ImageBackground source={utils.firstScreenBG} style={styles.bgImage}>
					<View style={styles.screenContainer}>
						
						<View style={{
							...styles.textinputContainer, 
							marginTop:windowHeight * 0.57
						}}>
							<TextInput
								style={styles.textinput}
								placeholder="Phone number"
								placeholderTextColor ={'white'}
								// placeholderTextColor ={utils.dimWhite}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) =>  this.setState(prev => ({...prev, phone_number: value})) }
							/>
							<View style={styles.iconContainer}>
								<Icon
								  // raised
								  name={utils.userIcon}
								  type='font-awesome'
								  color={utils.lightGrey}
								  size={30}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
							</View>
						</View>


						<View style={styles.textinputContainer}>
							<TextInput
								style={styles.textinput}
								placeholder="Password"
								secureTextEntry={true}
								placeholderTextColor ={'white'}
								// placeholderTextColor = {utils.dimWhite}
								// maxLength=10
								// caretHidden=true
								// multiline=true
								// numberOfLines=3
								// onChangeText={ () => null }
								// value='dummy'
								// autoFocus=true
								onChangeText={ (value) =>  this.setState(prev => ({...prev, password: value})) }
							/>
							<View style={styles.iconContainer}>
								<Icon
								  // raised
								  name={utils.passwordIcon}
								  type='font-awesome'
								  color={utils.lightGrey}
								  size={30}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
							</View>
						</View>
							
						<View style={styles.buttonContainer}>
							<TouchableOpacity activeOpacity={0.2} onPress={() => this.login_and_get_jwt_token_and_privileges()} style={styles.roundButton}>
								<Text style={styles.innerText}>
									Get Started
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.bottomButtonsContainer}>
							<View style={{flex:1,}}>
								<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.navigate('SignUp')} style={styles.buttonWithoutBG}>
									<Text style={styles.createAccountText}>
										Create Account
									</Text>
								</TouchableOpacity>
							</View>

							<View style={{flex:1}}>
								<TouchableOpacity activeOpacity={0.2} onPress={() => {}} style={styles.buttonWithoutBG}>
									<Text style={styles.needHelpText}>
										Need Help?
									</Text>
								</TouchableOpacity>
							</View>

						</View>

		{/*				<Button 
							title={'LOGOUT'}
							style={styles.lowerButton} activeOpacity={0.2}
							onPress={ () => this.logout_and_remove_jwt_token() }
						/>
		*/}
					</View>
				</ImageBackground>
			</KeyboardAwareScrollView>
		);

	}
}


const styles = StyleSheet.create({
	screenContainer:{
		alignItems:'center',
		flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-between', 
		// backgroundColor: '#ffffff',
	},
	bgImage:{
		resizeMode: "stretch",
		height: windowHeight,
		width: windowWidth,
	},



// text inputs
	textinputContainer:{
		paddingTop:0,
		marginTop:0,	
		// backgroundColor: '#000000',
		width: '90%',
		height: windowHeight * 0.1
		// marginBottom: windowHeight * 0.005,
	},
// icon container
	iconContainer:{
		position: 'relative',
		bottom: windowHeight * 0.065,
		// right: windowWidth * 0.35,
		// backgroundColor: 'white',
		width: 60,
	},
	textinput:{
		// backgroundColor: '#000000',
		// marginTop:10,
		textAlign:'left',
		borderWidth:1,
		borderStyle:'solid',
		paddingTop:17,
		paddingBottom:17,
		fontSize:18,
		borderRadius:50,
		borderColor:utils.mediumGrey,
		backgroundColor: utils.mediumGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.7,
		color:'white',
	},

// roundbutotn
	buttonContainer:{
		justifyContent: 'center',
		alignSelf:'center',
		width:'90%',
	},
	roundButton:{
		borderStyle:'solid',
		width:'100%',
		paddingTop:15,
		borderRadius:50,
		borderColor:utils.orange,
		borderWidth:2,
		paddingBottom:15,
		backgroundColor: utils.orange,
	},
	innerText:{
		textAlign:'center',
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},



// bottom buttons
	bottomButtonsContainer:{
		// alignSelf:'center',
		marginTop: windowHeight * 0.01,
		height: windowHeight * 0.1,
		width:'90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignSelf:'center',

	},
	createAccountText:{
		// color:utils.mediumGrey,
		color:'white',
	},
	needHelpText:{
		textAlign:'right',
		// color:utils.mediumGrey,
		color:'white',
	},
	forGotPasswordText:{
		color: utils.lightGrey,
		fontSize: 20,
	},
})

export default LoginScreen