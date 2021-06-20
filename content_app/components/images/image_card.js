
import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
	FlatList,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Consumer } from "../../screens/image"

import {
	// ComponentForShowingImage,
	ComponentForShowingImageCategory,
} from "."

import utils from "../../utilities";

import {
	ShowCommentsOfImage,
} from "../comments/"

import {
	ConnectedComponentForShowingImage,
	ConnectedCreateCommentForImage,
	// ConnectedSummarizeCommentsOfImage,
	// ConnectedSummarizeLikesOfImage,
} from "../../redux_stuff/connected_components"

import {
	ShowLikesOfImage,
} from "../likes/"

import {
	ConnectedCreateLikeForImage,
} from "../../redux_stuff/connected_components"

import {
	ComponentForShowingComment
} from "../comments/"

import {
	ComponentForShowingLike
} from "../likes/"


import { Icon } from 'react-native-elements';

class ImageCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			comments: [],
			likes: [],
			users: [],

			current_likes_quantity: this.props.dataPayloadFromParent.likes_quantity,
			current_comments_quantity: this.props.dataPayloadFromParent.comments_quantity,

			show_all_likes: false,
			show_all_comments: false,

		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/image/get-all-comments-of-image', 
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

		axios.get(utils.baseUrl + '/image/get-all-likes-of-image', 
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
	  			navigation={this.props.navigation}
				getIndividualImage = {this.props.getIndividualImage}
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>
		:
	  		<ConnectedComponentForShowingImage
	  			navigation={this.props.navigation}
				getIndividualImage = {this.props.getIndividualImage}
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>

	  	if (this.state.show_all_likes){

	  		return (
  				<View style={{
  					height:windowHeight, 
  				}}>
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {

							this.setState(prev => ({...prev, 
								show_all_likes: false,
								show_all_comments: false,
							}))
							
						}}
					>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
							Close Likes
						</Text>
					</TouchableOpacity>


  			  		<FlatList
  						style={{flexDirection: 'column', flexWrap : "wrap"}}
  						numColumns={1}
  			  			data={this.state.likes}
  						renderItem={
  							({ item }) => (
  								<ComponentForShowingLike
  									componentData = { item }
  								/>
  							)}
  						keyExtractor={(item, index) => String(index)}
  					/>

  				</View>
  			)

	  	} else if (this.state.show_all_comments){

			return(
				<View style={{
					height:windowHeight, 
				}}>
					<TouchableOpacity
						style={styles.socialButtonAndStats}
						activeOpacity={0.2} 
						onPress={ () => {

							this.setState(prev => ({...prev, 
								show_all_likes: false,
								show_all_comments: false,
							}))
							
						}}
					>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
							Close Comments
						</Text>
					</TouchableOpacity>

			  		<FlatList
						style={{flexDirection: 'column', flexWrap : "wrap"}}
						numColumns={1}
			  			data={this.state.comments}
						renderItem={
							({ item }) => (
								<ComponentForShowingComment
									componentData = { item }
								/>
							)}
						keyExtractor={(item, index) => String(index)}
					/>

				</View>
			)
	  	} else {

	  		return (

	  		  	<View style={styles.outerContainer}>

	  		  		<View>
	  					{componentToShow}
	  		  		</View>

	  				<View style={styles.socialButtonsAndStatsContainer}>
	  					{/* 2nd show individual summary of childs */}
	  					<TouchableOpacity
	  						style={styles.socialButtonAndStats}
	  						activeOpacity={0.2} 
	  						onPress={ () => {
	  							this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
	  							// this.props.toggle_show_comments_for_image()

	  							this.setState(prev => ({...prev, 
									show_all_likes: false,
									show_all_comments: true,
	  							}))
	  							
	  						}}
	  					>
	  						<View style={styles.iconContainer}>
	  							<Icon
	  								// raised
	  								name={utils.commentIcon}
	  								type='font-awesome'
	  								iconStyle='Outlined'
	  								color='#f50'
	  								size={30}
	  								// onPress={() => console.log('hello')} 
	  								// reverse={true}
	  							/>
	  							<Text style={styles.commentQuantityText}>
	  								{this.state.current_comments_quantity} comments 
	  							</Text>
	  						</View>

	  					</TouchableOpacity>
	  					
	  					<TouchableOpacity 
	  						style={styles.socialButtonAndStats}
	  						activeOpacity={0.2} 
	  						onPress={ () => { 
	  							this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) 
	  							// this.props.toggle_show_likes_for_image()
	  							this.setState(prev => ({...prev, 
									show_all_comments: false,
									show_all_likes: true,
	  							}))

	  						}}
	  					>						
	  						<View style={styles.iconContainer}>
	  							<Icon
	  								// raised
	  								name={utils.likeIcon}
	  								type='font-awesome'
	  								// iconStyle='Outlined'
	  								color='#f50'
	  								size={30}
	  								// onPress={() => console.log('hello')} 
	  								// reverse={true}
	  							/>
	  							<Text style={styles.commentQuantityText}>
	  								{this.state.current_likes_quantity} likes
	  							</Text>
	  						</View>

	  					</TouchableOpacity>

	  				</View>

	  				<View style={styles.createCommentAndLikeContainer}>
	  					{/* 4th create individual child options like comment / like */}					
	  					<ConnectedCreateCommentForImage
	  						parentDetailsPayload = { this.props.dataPayloadFromParent }
							navigation={this.props.navigation}
							add_comments_quantity = {() => this.setState(prev => ({...prev, current_comments_quantity: prev.current_comments_quantity + 1}))}
	  					/>					
	  					<ConnectedCreateLikeForImage
	  						parentDetailsPayload = { this.props.dataPayloadFromParent }
							navigation={this.props.navigation}
							add_likes_quantity = {() => this.setState(prev => ({...prev, current_likes_quantity: prev.current_likes_quantity + 1}))}
	  					/>
	  				</View>

	  		  	</View>
	  		);
	  	} 

	}
}
	
ImageCard.defaultProps = {
	isCategoryInstead: false
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

	iconContainer:{
		marginLeft:30,
		flexDirection:'row'
	},

	commentQuantityText:{
		marginLeft:10,
		fontSize:20,
	},


});


export default ImageCard;