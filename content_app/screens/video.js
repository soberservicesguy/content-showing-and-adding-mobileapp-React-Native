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
} from '../components/videos/';

// IMPORT CONNECTED COMPONENTS
import {
	ConnectedVideoCard,
	ConnectedCreateVideo,
} from '../redux_stuff/connected_components';

const { Provider, Consumer } = React.createContext();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class VideoScreen extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			get_individual_image:false,
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
			axios.get(utils.baseUrl + '/video/videos-list-with-children-light',)
			.then((response) => {
				if (response.data.success){

					this.props.set_fetched_videos(response.data)
			    	this.setState({ get_individual_image: true })				
				}

			})
			.catch((error) => {
				console.log(error);
				this.props.set_fetched_videos([])
			})


	}
	get_10_more_items() {
		axios.get(utils.baseUrl + `/videos/videos-list-next-10-with-children`)
		.then((response) => {
			this.props.set_fetched_10_more_video(response.data)
		})
		.catch((error) => {
			console.log(error);
		})		
	}

// RENDER METHOD
	render() {
			
		const total_videos = this.props.total_videos

		return (
			<SafeAreaView>
				<ScrollView contentContainerStyle={styles.screenContainer}>

					<FlatList
						style={{flexDirection: 'column', flexWrap : "wrap", alignSelf:'center'}}
						numColumns={1}
						data={total_videos}
						renderItem={
							({ item }) => {

		  						// console.log('item')
		  						// console.log(item)

								return (
									<ConnectedVideoCard
										isCategoryInstead={false}

										dataPayloadFromParent = { item }

										comments_quantity = { item.total_comments }
										comments = { item.comments || [] }

										likes_quantity = { item.total_likes }
										likes = { item.likes || [] }									
									/>
								)
						}}
						keyExtractor={(item, index) => String(index)}
					/>

					<View>
			  			<ConnectedCreateVideo
  			  				navigation={this.props.navigation}
			  			/>
			  		</View>


				</ScrollView>
			</SafeAreaView>
		);
	}
}

VideoScreen.defaultProps = {
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

})

export default VideoScreen;
