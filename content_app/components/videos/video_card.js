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

import { Consumer } from "../../screens/video"

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

		axios.get(utils.baseUrl + '/videos/get-all-comments-of-video', 
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

		axios.get(utils.baseUrl + '/videos/get-all-likes-of-video', 
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
			  		<ComponentForShowingVideo
						dataPayloadFromParent = { this.props.dataPayloadFromParent }
			  		/>
		  		</View>

				<View style={{marginTop:50}}>
					{/* 2nd show individual summary of childs */}
					<SummarizeCommentsOfVideo
						showOnlyQuantity= { false }
						child_quantity = { this.props.comments_quantity }
						dataPayloadFromParent = { this.props.comments }
					/>
					<SummarizeLikesOfVideo
						showOnlyQuantity= { false }
						child_quantity = { this.props.likes_quantity }
						dataPayloadFromParent = { this.props.likes }
					/>
				</View>

				<View>
					{/* 3rd show individual button for showing childs */}

					<Button
						title={'Show All Comment'}
						onPress={ () => this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowCommentsOfVideo
						dataPayloadFromParent = { this.state.comments }
					/>

					<Button 
						title={'Show All Like'}
						style={{marginTop:50}}
						onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
					/>
					
					<ShowLikesOfVideo
						dataPayloadFromParent = { this.state.likes }
					/>
				</View>

				<View style={{marginTop:50}}>
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


export default VideoCard;