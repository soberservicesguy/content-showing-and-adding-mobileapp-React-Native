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

import DocumentPicker from 'react-native-document-picker';

class CreateBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,

			category: '',
			image_main_filepath: '',
			title: '',
			// timestamp_of_uploading: '',
			initial_tags: '',
			// endpoint: '',
			first_para: '',
			second_para: '',
			qouted_para: '',
			third_para: '',
			fourth_para: '',
			all_tags: '',		
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route

		return (
		// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
			<View style={styles.outerContainer}>
				<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>
					Blogpost Create Section
				</Text>
				<Button 
					title={'Select Blogpost Image'}
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
							this.setState(prev => ({...prev, image_main_filepath: res}))

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
							placeholder="Type category"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// autoFocus=true
							value={this.state.category}
							onChangeText={ (value) => this.setState( prev => ({...prev, category: value})) }
						/>
				  	</View>

				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type title"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
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
							placeholder="Type initial_tags"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.initial_tags}
							onChangeText={ (value) => this.setState( prev => ({...prev, initial_tags: value})) }
						/>
				  	</View>

				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type first_para"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.first_para}
							onChangeText={ (value) => this.setState( prev => ({...prev, first_para: value})) }
						/>
				  	</View>
			  	</View>

				<View style={{
					display: 'flex',
					flexDirection: 'row',
				}}>

				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type second_para"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.second_para}
							onChangeText={ (value) => this.setState( prev => ({...prev, second_para: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type qouted_para"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.qouted_para}
							onChangeText={ (value) => this.setState( prev => ({...prev, qouted_para: value})) }
						/>
				  	</View>
			  	</View>

				<View style={{
					display: 'flex',
					flexDirection: 'row',
				}}>
				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type third_para"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.third_para}
							onChangeText={ (value) => this.setState( prev => ({...prev, third_para: value})) }
						/>
				  	</View>


				  	<View style={styles.textinputContainer}>
						<TextInput
							placeholder="Type fourth_para"
							placeholderTextColor = {utils.lightGrey}
							style={styles.textinput}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// onChangeText={ () => null }
							// autoFocus=true
							value={this.state.fourth_para}
							onChangeText={ (value) => this.setState( prev => ({...prev, fourth_para: value})) }
						/>
				  	</View>
			  	</View>


			  	<View style={styles.textinputContainer}>
					<TextInput
						placeholder="Type all_tags"
						placeholderTextColor = {utils.lightGrey}
						style={styles.textinput}
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

				<Button
					title={'Press To Create Blogpost'} 
					style={styles.buttonWithoutBG}
					onPress={ () => {

						let setResponseInCurrentBlogPost = (arg) => this.props.set_current_blogpost(arg)
						let redirectToNewBlogPost = () => {this.props.navigation.navigate('Individual_BlogPost')}

						let redirectToSignIn = () => this.props.navigation.navigate('SignInStack', { screen: 'Login' })
						let setIsSignedInCallback = () => this.props.set_is_signed_in( false )
						let setPhoneNumberCallback = () => this.props.set_phone_number( null )
						let clearInput = () => this.setState({
							category:'' ,
							title:'' ,
							initial_tags:'' ,
							first_para:'' ,
							second_para:'' ,
							qouted_para:'' ,
							third_para:'' ,
							fourth_para:'' ,
							all_tags:'' ,
							image_main_filepath:'' ,
						})

						// in formData send individual variables and not a complete object
						// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
						const formData = new FormData()
						formData.append('category', this.state.category)
						formData.append('title', this.state.title)
						formData.append('initial_tags', this.state.initial_tags)
						formData.append('first_para', this.state.first_para)
						formData.append('second_para', this.state.second_para)
						formData.append('qouted_para', this.state.qouted_para)
						formData.append('third_para', this.state.third_para)
						formData.append('fourth_para', this.state.fourth_para)
						formData.append('all_tags', this.state.all_tags)
						if (this.state.image_main_filepath !== ''){
							formData.append('blogpost_image_main', {uri:this.state.image_main_filepath.uri, type:this.state.image_main_filepath.type, name: this.state.image_main_filepath.name})

							axios.post(utils.baseUrl + '/blogpostings/create-blogpost-with-user', formData)
							.then(function (response) {
								clearInput()
						    	if (response.status === 401){
									setIsSignedInCallback()
									setPhoneNumberCallback()
									redirectToSignIn()
						    	}

								// console.log(response.data) // current blogpost screen data
								
								// set to current parent object
								setResponseInCurrentBlogPost(response.data.new_blogpost)

								// change route to current_blogpost
								redirectToNewBlogPost()

							})
							.catch(function (error) {

								console.log('caught error while creating blogpost')
								console.log(error)

								// using below condition since log spits below line with 401 status code
								if (String(error).split(" ").join("") === 'Error: Request failed with status code 401'.split(" ").join("")){

									setIsSignedInCallback()
									setPhoneNumberCallback()
									redirectToSignIn()

								}

							});						

						}

					}}
				/>

			</View>
		);
			
	}
}
	
CreateBlogPost.defaultProps = {

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


	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},

});


export default CreateBlogPost;