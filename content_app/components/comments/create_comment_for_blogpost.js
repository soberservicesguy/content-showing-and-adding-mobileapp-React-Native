import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	TextInput,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class CreateCommentForBlogpost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			switchScreen: false,
			text: '',
			// commenting_timestamp: '',
		}

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
			this.props.navigation.navigate('Individual_BlogPost', {
				itemId: 86,
				otherParam: 'anything you want here',
			})
			// const payload_from_previous_screen = this.props.navigation.route.params 

		} else {

		return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object

				<View style={styles.outerContainer}>


				  	<View style={styles.textinputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder="Type your comment"
							placeholderTextColor = {utils.lightGrey}
							// maxLength=10
							// caretHidden=true
							// multiline=true
							// numberOfLines=3
							// value='dummy'
							// autoFocus=true
							onChangeText={ (value) => this.setState( prev => ({...prev, text: value})) }
						/>
				  	</View>


				  	<TouchableOpacity 
				  		activeOpacity={0.2} 
				  		style={styles.buttonWithoutBG}
						onPress={ () => {
							let setResponseInCurrentBlogpost = (arg) => this.props.set_current_blogpost(arg)
							let redirectToNewBlogpost = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							// first create child object
							axios.post(utils.baseUrl + '/blogpostings/create-comment-for-blogpost', 
								{
									comment_text: this.state.text,
									blogpost_endpoint: this.props.parentDetailsPayload.endpoint,
								})
							.then(function (response) {
								console.log(response.data) // current image screen data
								
								// set to current parent object
								setResponseInCurrentBlogpost(response.data)

								// change route to current_image	
								redirectToNewBlogpost()							

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
			  		>
				  		<Text style={styles.innerText}>
							Create Comment
				  		</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}
	
CreateCommentForBlogpost.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer: {
		height: windowHeight * 0.08,
		// backgroundColor: '#000000',
		alignItems: 'center',
		flexDirection:'row',
	},


// text inputs
	textinputContainer:{
		paddingTop:0,
		marginTop:0,	
		// backgroundColor: '#000000',
		// width: '70%',
		flex:4,
		height: windowHeight * 0.07
		// marginBottom: windowHeight * 0.005,
	},
// icon container
	iconContainer:{
		position: 'relative',
		bottom: windowHeight * 0.065,
		right: windowWidth * 0.35,
	},
	textinput:{
		// backgroundColor: '#000000',
		// marginTop:10,
		textAlign:'left',
		borderWidth:1,
		borderStyle:'solid',
		// paddingTop:17,
		// paddingBottom:17,
		fontSize:18,
		borderRadius:50,
		borderColor:utils.darkGrey,
		// backgroundColor: utils.darkGrey,
		borderWidth:2,
		paddingLeft:windowWidth * 0.17,
		fontWeight: 'bold',
		opacity: 0.5,
	},

// create comment button
	buttonWithoutBG:{
		flex:1
	},
	innerText:{
		textAlign:'center',
	},

});

export default CreateCommentForBlogpost