import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	Button,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import {
	ComponentForShowingLike
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';

class SummarizeLikesOfBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}

	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		return (

			<View style={styles.outerContainer}>

				<View style={styles.iconContainer}>
					<Icon
						// raised
						name={utils.likeIcon}
						type='font-awesome'
						iconStyle='Outlined'
						color='#f50'
						size={30}
						// onPress={() => console.log('hello')} 
						// reverse={true}
					/>
					<Text style={styles.commentQuantityText}>
						{this.props.child_quantity} likes
					</Text>
				</View>


				<Modal				  	
					animationType={"none"}
					transparent={false}
					visible={this.props.show_blogpost_likes}
					// presentationStyle={'formSheet'}
					// onRequestClose={() => {Alert.alert("Modal has been closed.");}}
				>
					<View style={{
						height:windowHeight, 
					}}>
						<Button
							color={'black'}
							title={'close likes'}
							onPress={() => {
								this.props.toggle_show_likes_for_blogpost()
							}} 
						/>

				  		<FlatList
							style={{flexDirection: 'column', flexWrap : "wrap"}}
							numColumns={1}
				  			data={this.props.dataPayloadFromParent}
							renderItem={
								({ item }) => (
									<ComponentForShowingLike
										componentData = { item }
									/>
								)}
							keyExtractor={(item, index) => String(index)}
						/>

					</View>
				</Modal>

			</View>
		);
	}
}
	
SummarizeLikesOfBlogPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},


	iconContainer:{
		marginLeft:30,
		flexDirection:'row'
	},
	commentQuantityText:{
		marginLeft:10,
		fontSize:20,
	},

	// cross button
	crossButtonContainer:{
		width:100,
		height:100,
		backgroundColor: '#000000',
		position:'absolute',
		// top:,
		// left:,
	},
});


export default SummarizeLikesOfBlogPost;