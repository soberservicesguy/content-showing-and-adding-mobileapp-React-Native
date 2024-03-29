import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Button,
	Modal,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/video"

import { Icon } from 'react-native-elements';

import {
	ComponentForShowingLike
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SummarizeLikesOfVideo extends Component {
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
					visible={this.props.show_video_likes}
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
								console.log('clicked')
								this.props.toggle_show_likes_for_video()
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
	
SummarizeLikesOfVideo.defaultProps = {

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


export default SummarizeLikesOfVideo;