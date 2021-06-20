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
} from '../components/videos/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedVideoCard,
	ConnectedCreateVideo,
} from '../redux_stuff/connected_components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class VideoScreen extends Component {
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


// COMPONENT DID MOUNT
	setUpScreen() {

		let redirectToSignIn = () => this.props.navigation.navigate('SignInStack', { screen: 'Login' })
		let setIsSignedInCallback = () => this.props.set_is_signed_in( false )
		let setPhoneNumberCallback = () => this.props.set_phone_number( null )

		axios.get(utils.baseUrl + '/video/videos-list-with-children-light',)
		.then((response) => {


	    	if (response.status === 401){
				setIsSignedInCallback()
				setPhoneNumberCallback()
				redirectToSignIn()
	    	}


			if (response.data.success){

				this.props.set_fetched_videos(response.data.videos)
		    	this.setState({ get_individual_image: true })				

			}

		})
		.catch((error) => {
			console.log(error);
			this.props.set_fetched_videos([])

			// using below condition since log spits below line with 401 status code
			if (String(error).split(" ").join("") === 'Error: Request failed with status code 401'.split(" ").join("")){

				setIsSignedInCallback()
				setPhoneNumberCallback()
				redirectToSignIn()

			}

		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/videos/videos-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_video(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_videos = this.props.total_videos

		return (
			<KeyboardAwareScrollView>

				<SafeAreaView>
					<ScrollView contentContainerStyle={styles.screenContainer}>

						<FlatList
							style={{flexDirection: 'column', flexWrap : "wrap", alignSelf:'center', paddingBottom:30}}
							numColumns={1}
							data={total_videos}
							renderItem={
								({ item }) => {

			  						// console.log('item')
			  						// console.log(item)

									return (
										<ConnectedVideoCard
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

						<View>
				  			<ConnectedCreateVideo
	  			  				navigation={this.props.navigation}
				  			/>
				  		</View>


					</ScrollView>
				</SafeAreaView>
			</KeyboardAwareScrollView>

		);
	}
}

VideoScreen.defaultProps = {
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

})

export default VideoScreen;
