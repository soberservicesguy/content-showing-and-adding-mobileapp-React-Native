
import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Consumer } from "../../screens/image"

import {
	ComponentForShowingImage,
	ComponentForShowingImageCategory,
} from "."

import utils from "../../utilities";

import {
	ShowCommentsOfImage,
} from "../comments/"

import {
	ConnectedCreateCommentForImage,
	ConnectedSummarizeCommentsOfImage,
	ConnectedSummarizeLikesOfImage,
} from "../../redux_stuff/connected_components"

import {
	ShowLikesOfImage,
} from "../likes/"

import {
	ConnectedCreateLikeForImage,
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
		let componentToShow = (this.props.isCategoryInstead) ?
	  		<ComponentForShowingImageCategory
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>
		:
	  		<ComponentForShowingImage
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>


		return (
		  	<View style={styles.outerContainer}>

		  		<View>
					{/* first the parent / card component */}
					{componentToShow}
		  		</View>

				<View style={styles.socialButtonsAndStatsContainer}>
					{/* 2nd show individual summary of childs */}
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {
							this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_comments_for_image()
						}}
					>
						<ConnectedSummarizeCommentsOfImage
							showOnlyQuantity = { this.props.show_image_comments }
							child_quantity = { this.props.comments_quantity }
							dataPayloadFromParent = { this.props.comments }
						/>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_image()
						}}
					>						
						<ConnectedSummarizeLikesOfImage
							showOnlyQuantity = { this.props.show_image_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>

				</View>

				<View style={styles.createCommentAndLikeContainer}>
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
	isCategoryInstead: true
};

const styles = StyleSheet.create({
	outerContainer:{
		marginBottom:10,
	},

// comments and likes counts
	socialButtonsAndStatsContainer:{
		flexDirection:'row', 
		// justifyContent:'space-between',
		justifyContent:'flex-start',
	},
	socialButtonAndStats:{
		height:windowHeight * 0.05
	},

// create comment and like
	createCommentAndLikeContainer:{
		marginTop: windowHeight * 0.001,
	},

});


export default ImageCard;