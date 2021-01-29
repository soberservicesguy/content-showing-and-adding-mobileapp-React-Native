import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	FlatList,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';
import firebase from 'firebase';

import utils from "../utilities"

// IMPORT COMPONENTS
import {
} from '../components/images/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedComponentForShowingImage,
	ConnectedCreateImage,
} from '../redux_stuff/connected_components';

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ImageScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/images/images-list-with-children',)
			.then((response) => {
				// console.log(response.data)
				this.props.set_fetched_images(response.data)
			})
			.catch((error) => {
				console.log(error);
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

		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

		return (

			<View style={{backgroundColor: '#eee'}}>
				
				<View item xs={12} sm={12} md={12} lg={12} xl={12}>
		  			<ConnectedCreateImage/>
		  		</View>

	  	  		<FlatList
	  				style={{flexDirection: 'column', flexWrap : "wrap"}}
	  				numColumns={1}
	  	  			data={total_images}
	  				renderItem={
	  					({ item }) => (
							<ConnectedImageCard
								dataPayloadFromParent = { item }

								comments_quantity = { item.comments_quantity }
								comments = { item.comments || [] }

								likes_quantity = { item.likes_quantity }
								likes = { item.likes || [] }

								// user_quantity = { item.user_quantity }
								// user = { item.user || [] }
							
							/>
	  					)}
	  				keyExtractor={(item, index) => String(index)}
	  			/>

			</View>

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