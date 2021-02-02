
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
	SummarizeCommentsOfImage,
	ShowCommentsOfImage,
} from "../comments/"

import {
	ConnectedCreateCommentForImage,
} from "../../redux_stuff/connected_components"

import {
	SummarizeLikesOfImage,
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

			showOnlyQuantityForComments: true,
			showOnlyQuantityForLikes: true,
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
		  	<View style={{marginBottom:10,}}>

		  		<View>
					{/* first the parent / card component */}
					{componentToShow}
		  		</View>

				<View style={{
					flexDirection:'row', 
					// justifyContent:'space-between',
					justifyContent:'flex-start',
				}}>
					{/* 2nd show individual summary of childs */}
					<TouchableOpacity
						style={{
							height:windowHeight * 0.05,
							// backgroundColor: '#000000'
						}}
						activeOpacity={0.2} 
						onPress={ () => {
							console.log('ssosoo')
							this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
							this.setState( prev => ({...prev, showOnlyQuantityForComments: (prev.showOnlyQuantityForComments === true) ? false : true}) )							
						}}
					>
						<SummarizeCommentsOfImage
							showOnlyQuantity= { this.state.showOnlyQuantityForComments }
							child_quantity = { this.props.comments_quantity }
							dataPayloadFromParent = { this.props.comments }
						/>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={{
							height:windowHeight * 0.05,
							// backgroundColor: '#000000'
						}}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 

							this.setState( prev => ({...prev, showOnlyQuantityForLikes: (prev.showOnlyQuantityForLikes === true) ? false : true}) )
						}}
					>						
						<SummarizeLikesOfImage
							showOnlyQuantity= { this.state.showOnlyQuantityForLikes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>

				</View>

				<View style={{
					marginTop: windowHeight * 0.001,
					// flexDirection:'row'
				}}>
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
});


export default ImageCard;