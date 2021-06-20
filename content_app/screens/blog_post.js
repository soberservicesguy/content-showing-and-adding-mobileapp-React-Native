import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
	SafeAreaView,
	ScrollView,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/blogposts/';

// IMPORT CONNECTED COMPONENTS
import {
	// ConnectedComponentForShowingBlogPost,
	ConnectedCreateBlogPost,
	ConnectedBlogPostCard,
} from '../redux_stuff/connected_components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BlogPostScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			get_individual_image:false,
		}	
	}

	componentDidMount() {
		this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
			// below will be executed when user enters this screen
			console.log('screen_payload')
			console.log(this.state.screen_payload)

			this.setUpScreen()
			// const payload_from_previous_screen = this.props.navigation
			// let { id } = payload_from_previous_screen
		});

		this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
			// below will be executed when user leaves this screen
			console.log('I AM UNMOUNTED')
			// const payload_from_previous_screen = this.props.navigation
			// let { id } = payload_from_previous_screen
		});

	}

	componentWillUnmount() {
		this._unsubscribeFocus();
		this._unsubscribeBlur();
	}


	setUpScreen() {

		let redirectToSignIn = () => this.props.navigation.navigate('SignInStack', { screen: 'Login' })
		let setIsSignedInCallback = () => this.props.set_is_signed_in( false )
		let setPhoneNumberCallback = () => this.props.set_phone_number( null )


	// FETCHING DATA FOR COMPONENT
		axios.get(utils.baseUrl + '/blogpostings/blogposts-list-with-children',)
		.then((response) => {

	    	if (response.status === 401){
				setIsSignedInCallback()
				setPhoneNumberCallback()
				redirectToSignIn()
	    	}


			if (response.data.success){

				this.props.set_fetched_blogposts(response.data.blogposts)
		    	this.setState({ get_individual_image: true })				

			} else {

				this.props.set_fetched_blogposts([])

			}
		})
		.catch((error) => {
			console.log(error);
			this.props.set_fetched_blogposts([])

			// using below condition since log spits below line with 401 status code
			if (String(error).split(" ").join("") === 'Error: Request failed with status code 401'.split(" ").join("")){

				setIsSignedInCallback()
				setPhoneNumberCallback()
				redirectToSignIn()

			}

		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/blogpostings/blogposts-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_blogpost(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_blogposts = this.props.total_blogposts

		return (
			<KeyboardAwareScrollView>
				<SafeAreaView>
					<ScrollView contentContainerStyle={styles.screenContainer}>
		
			  	  		<FlatList
			  				style={{flexDirection: 'column', flexWrap : "wrap", alignSelf:'center'}}
			  				numColumns={1}
			  	  			data={total_blogposts}
			  				renderItem={
			  					({ item }) => {

			  						// console.log('item')
			  						// console.log(item)

									return (
										<ConnectedBlogPostCard
											navigation={this.props.navigation}
											getIndividualImage = {this.state.get_individual_image}

											isCategoryInstead={false}
											dataPayloadFromParent = { item }

											comments_quantity = { item.total_comments }
											comments = { item.comments || [] }

											likes_quantity = { item.total_likes }
											likes = { item.likes || [] }
										/>
									)
			  					}}
			  				keyExtractor={(item, index) => String(index)}
			  			/>

	  					<View style={{marginTop:30,}}>
	  			  			<ConnectedCreateBlogPost
	  			  				navigation={this.props.navigation}
	  			  			/>
	  			  		</View>

					</ScrollView>
				</SafeAreaView>
			</KeyboardAwareScrollView>

		);
	}
}

BlogPostScreen.defaultProps = {
	// : ,
};


const styles = StyleSheet.create({
	container: {
	},
	bigBlue: {
	},					
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},

});

export default BlogPostScreen;