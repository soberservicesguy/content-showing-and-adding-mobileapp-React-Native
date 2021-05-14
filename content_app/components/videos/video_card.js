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

import { Consumer } from "../../screens/video"

import {
	// ComponentForShowingVideo,
	ComponentForShowingVideoCategory,
} from "."

import utils from "../../utilities";

import {
	ShowCommentsOfVideo,
} from "../comments/"

import {
	ConnectedCreateCommentForVideo,
	ConnectedComponentForShowingVideo,
} from "../../redux_stuff/connected_components"

import {
	ShowLikesOfVideo,
} from "../likes/"

import {
	ConnectedCreateLikeForVideo,
	ConnectedSummarizeCommentsOfVideo,
	ConnectedSummarizeLikesOfVideo,
} from "../../redux_stuff/connected_components"


class VideoCard extends Component {
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

		axios.get(utils.baseUrl + '/video/get-all-comments-of-video', 
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

		axios.get(utils.baseUrl + '/video/get-all-likes-of-video', 
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
		
		let componentToShow = ( this.props.isCategoryInstead ) ? 
			<ComponentForShowingVideoCategory
	  			navigation={this.props.navigation}
				getIndividualImage = {this.props.getIndividualImage}
				dataPayloadFromParent = { this.props.dataPayloadFromParent }			
			/>
		:
	  		<ConnectedComponentForShowingVideo
	  			navigation={this.props.navigation}
				getIndividualImage = {this.props.getIndividualImage}
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>



		return (
		  	<View>

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
							this.props.toggle_show_comments_for_video()
						}}
					>
						<ConnectedSummarizeCommentsOfVideo
							showOnlyQuantity = { this.props.show_video_comments }
							child_quantity = { this.props.comments_quantity }
							dataPayloadFromParent = { this.props.comments }
						/>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => { 
							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
							this.props.toggle_show_likes_for_video()
						}}
					>						
						<ConnectedSummarizeLikesOfVideo
							showOnlyQuantity = { this.props.show_video_likes }
							child_quantity = { this.props.likes_quantity }
							dataPayloadFromParent = { this.props.likes }
						/>
					</TouchableOpacity>

				</View>

				<View style={styles.createCommentAndLikeContainer}>
					{/* 4th create individual child options like comment / like */}					
					<ConnectedCreateCommentForVideo
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>					
					<ConnectedCreateLikeForVideo
						parentDetailsPayload = { this.props.dataPayloadFromParent }
					/>
				</View>



		  	</View>
		);
	}
}



	
VideoCard.defaultProps = {
	isCategoryInstead:false
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


export default VideoCard;