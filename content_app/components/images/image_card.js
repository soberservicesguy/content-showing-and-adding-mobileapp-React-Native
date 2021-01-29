
import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';
import firebase from 'firebase';

import { Consumer } from "../../screens/image"

import {
	ComponentForShowingImage
} from "."

import utils from "../../utilities";

import {
	SummarizeCommentsOfImage,
	ShowCommentsOfImage,
} from "../comments/"

import {
	ConnectedCreateComment,
} from "../../redux_stuff/connected_components"

import {
	SummarizeLikesOfImage,
	ShowLikesOfImage,
} from "../likes/"

import {
	ConnectedCreateLike,
} from "../../redux_stuff/connected_components"

class ImageCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			comments: [],
			likes: [],
			users: [],
		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/images/get-all-comments-of-image', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, comments: ( prev.comments.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}


	fetchAllLike(endpoint) {

		axios.get(utils.baseUrl + '/images/get-all-likes-of-image', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {
			// console.log(response.data);
			this.setState( prev => ({...prev, likes: ( prev.likes.length === 0 ) ? response.data : [] }) )
			
		})
		.catch((error) => {
			console.log(error);
		})
		
	}



// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
			  		<ComponentForShowingImage
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View>
					{/* 2nd show individual summary of childs */}
					<SummarizeCommentsOfImage
						showOnlyQuantity= { false }
						child_quantity = { this.props.comments_quantity }
						dataPayloadFromParent = { this.props.comments }
					/>
					<SummarizeLikesOfImage
						showOnlyQuantity= { false }
						child_quantity = { this.props.likes_quantity }
						dataPayloadFromParent = { this.props.likes }
					/>
				</View>

				<View style={{marginTop:50}}>
					{/* 3rd show individual button for showing childs */}

					<Button 
						title={'Show All Comment'}
						style={styles.buttonWithoutBG}
						onPress={ () => this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowCommentsOfImage
						dataPayloadFromParent = { this.state.comments }
					/>

					<Button 
						title={'Show All Like'}
						style={{marginTop:50}}
						onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowLikesOfImage
						dataPayloadFromParent = { this.state.likes }
					/>
				</View>

				<View style={{marginTop: 50}}>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateCommentForImage
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateLikeForImage
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>

		  	</View>
		);
	}
}
	
ImageCard.defaultProps = {

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


export default ImageCard;