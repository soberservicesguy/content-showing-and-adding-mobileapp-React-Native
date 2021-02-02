import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	Button,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import { Consumer } from "../../screens/blog_post"

import {
	ComponentForShowingBlogPost,
	ComponentForShowingBlogPostCategory
} from "."

import utils from "../../utilities";

import {
	SummarizeCommentsOfBlogPost,
	ShowCommentsOfBlogPost,
} from "../comments/"

import {
	ConnectedCreateCommentForBlogpost,
} from "../../redux_stuff/connected_components"

import {
	SummarizeLikesOfBlogPost,
	ShowLikesOfBlogPost,
} from "../likes/"

import {
	ConnectedCreateLikeForBlogpost,
} from "../../redux_stuff/connected_components"


class BlogPostCard extends Component {
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
			console.log('COMMENTS OBTAINED ARE BELOW')
			console.log(this.state.comments)
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
			console.log('LIKES ACHIEVED')
			console.log(response.data);
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
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
			/> :
	  		<ComponentForShowingBlogPost
				dataPayloadFromParent = { this.props.dataPayloadFromParent }
	  		/>


		return (
		  	<View>

		  		<View>
					{/* first the parent / card component */}
					{componentToUse}
		  		</View>


		  	</View>
		);
	}
}



	
BlogPostCard.defaultProps = {
	isCategoryInstead:true,
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

export default BlogPostCard;


				// <View style={{marginTop:10}}>
				// 	{/* 2nd show individual summary of childs */}
				// 	<SummarizeCommentsOfBlogPost
				// 		showOnlyQuantity= { false }
				// 		child_quantity = { this.props.comments_quantity }
				// 		dataPayloadFromParent = { this.props.comments }
				// 	/>
				// 	<SummarizeLikesOfBlogPost
				// 		showOnlyQuantity= { false }
				// 		child_quantity = { this.props.likes_quantity }
				// 		dataPayloadFromParent = { this.props.likes }
				// 	/>
				// </View>

				// <View style={{marginTop:10}}>
				// 	{/* 3rd show individual button for showing childs */}

				// 	<Button
				// 		title={'Show All Comments'} 
				// 		style={styles.buttonWithoutBG}
				// 		onPress={ () => this.fetchAllComment( this.props.dataPayloadFromParent.endpoint ) }
				// 	/>					
				// 	<ShowCommentsOfBlogPost
				// 		dataPayloadFromParent = { this.state.comments }
				// 	/>
				// 	<Button 
				// 		title={'Show All Like'}
				// 		style={{marginTop:50}}
				// 		onPress={ () => this.fetchAllLike( this.props.dataPayloadFromParent.endpoint ) }
				// 	/>
				// 	<ShowLikesOfBlogPost
				// 		dataPayloadFromParent = { this.state.likes }
				// 	/>
				// </View>

				// <View style={{marginTop:50}}>
				// 	{/* 4th create individual child options like comment / like */}					
				// 	<ConnectedCreateCommentForBlogpost
				// 		parentDetailsPayload = { this.props.dataPayloadFromParent }
				// 	/>					
				// 	<ConnectedCreateLikeForBlogpost
				// 		parentDetailsPayload = { this.props.dataPayloadFromParent }
				// 	/>
				// </View>
