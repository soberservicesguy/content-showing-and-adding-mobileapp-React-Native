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
} from '../components/blogposts/';

// IMPORT CONNECTED COMPONENTS
import {
	// ConnectedComponentForShowingBlogPost,
	ConnectedCreateBlogPost,
	ConnectedBlogPostCard,
} from '../redux_stuff/connected_components';

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BlogPostScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/blogpostings/blogposts-list-with-children',)
			.then((response) => {
				// console.log(response.data)
				this.props.set_fetched_blogposts(response.data)
			})
			.catch((error) => {
				console.log(error);
			})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/blogpostings/blogposts-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_blogpost(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_blogposts = this.props.total_blogposts


		return (

				<SafeAreaView>
					<ScrollView contentContainerStyle={styles.screenContainer}>
		
						<View>
				  			<ConnectedCreateBlogPost/>
				  		</View>

			  	  		<FlatList
			  				style={{flexDirection: 'column', flexWrap : "wrap", alignSelf:'center'}}
			  				numColumns={1}
			  	  			data={total_blogposts}
			  				renderItem={
			  					({ item }) => (
									<ConnectedBlogPostCard
										isCategoryInstead={false}
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

					</ScrollView>
				</SafeAreaView>

		);
	}
}

BlogPostScreen.defaultProps = {
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

export default BlogPostScreen;