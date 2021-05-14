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
} from '../components/images/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedComponentForShowingImage,
	ConnectedCreateImage,
	ConnectedImageCard,
} from '../redux_stuff/connected_components';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ImageScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			get_individual_image:false,
		}
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
		console.log('Making request')
		axios.get(utils.baseUrl + '/image/images-list-with-children-light',)
		.then((response) => {

			if (response.data.success){

				this.props.set_fetched_images(response.data.images)
		    	this.setState({ get_individual_image: true })
		    }

		})
		.catch((error) => {
			console.log(error);
			this.props.set_fetched_images([])
		})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/images/images-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_image(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_images = this.props.total_images

		return (

			<KeyboardAwareScrollView>
				<SafeAreaView>
					<ScrollView contentContainerStyle={{paddingBottom:100}}>
					
						<FlatList
							style={{flexDirection: 'column', flexWrap : "wrap", alignSelf:'center'}}
			  				numColumns={1}
			  	  			data={total_images}
			  				renderItem={
			  					({ item }) => {

			  						// console.log('item')
			  						// console.log(Object.keys(item))

									return (
										<ConnectedImageCard
											navigation={this.props.navigation}
											getIndividualImage = {this.state.get_individual_image}

											isCategoryInstead = {false}

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
				  			<ConnectedCreateImage
				  				navigation={this.props.navigation}
				  			/>
				  		</View>

					</ScrollView>
				</SafeAreaView>
			</KeyboardAwareScrollView>

		);
	}
}

ImageScreen.defaultProps = {
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

export default ImageScreen