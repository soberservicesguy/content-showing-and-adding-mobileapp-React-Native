import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	Button,
	TouchableHighlight,
	TouchableOpacity,
	FlatList,
	Image,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Consumer } from "../../screens/blog_post"

// import {
// 	ComponentForShowingBlogPost,
// } from "."

import utils from "../../utilities";

import {
	ShowCommentsOfBlogPost,
} from "../comments/"

import {
	ConnectedCreateLikeForBlogpost,
	ConnectedCreateCommentForBlogpost,
	ConnectedComponentForShowingBlogPost,
} from "../../redux_stuff/connected_components"

import {
	ComponentForShowingComment
} from "../comments/"

import {
	ComponentForShowingLike
} from "../likes/"

import { Icon } from 'react-native-elements';


class BlogPostCard extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded: false,
			comments: [],
			likes: [],
			users: [],

			current_likes_quantity: this.props.dataPayloadFromParent.total_likes,
			current_comments_quantity: this.props.dataPayloadFromParent.total_comments,


			show_all_likes: false,
			show_all_comments: false,

		}	

	}

	fetchAllComment(endpoint) {

		axios.get(utils.baseUrl + '/blogpostings/get-all-comments-of-blogpost', 
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

		axios.get(utils.baseUrl + '/blogpostings/get-all-likes-of-blogpost', 
			{
			    params: {
					endpoint: endpoint,
					child_count: 3,
			    }
			})
		.then((response) => {

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

		// console.log('COMMENTS')
		// console.log(this.state.comments)

		let componentToUse = (this.props.isCategoryInstead) ?
			<ComponentForShowingBlogPostCategory
	  			navigation={this.props.navigation}
				getIndividualImage = {this.props.getIndividualImage}
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
			/> :
	  		<ConnectedComponentForShowingBlogPost
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
			  	<View>

			  		<View>
						{componentToUse}
			  		</View>


					<View style={styles.socialButtonsAndStatsContainer}>
						<TouchableOpacity
							style={styles.socialButtonAndStats}
							activeOpacity={0.2} 
							onPress={ () => {
								this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) 
								// this.props.toggle_show_comments_for_blogpost()

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
								// this.props.toggle_show_likes_for_blogpost()

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
						<ConnectedCreateCommentForBlogpost
							parentDetailsPayload = { this.props.dataPayloadFromParent }
							navigation={this.props.navigation}
							add_comments_quantity = {() => this.setState(prev => ({...prev, current_comments_quantity: prev.current_comments_quantity + 1}))}
						/>					
						<ConnectedCreateLikeForBlogpost
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

	
BlogPostCard.defaultProps = {
	isCategoryInstead:true,
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


export default BlogPostCard;