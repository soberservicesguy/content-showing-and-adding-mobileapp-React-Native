import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';

class ComponentForShowingBlogPost extends Component {
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

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_main_filepath

		return (
			<View style={styles.outerContainer}>
				<Text style={styles.titleStyle}>
					{ data.title }
				</Text>
				<View style={styles.innerContainer}>
					<View style={styles.imageContainer}>
						<Image 
							// source={base64Image}
							source={utils.image}
							style={{
								// width:windowWidth * 0.2,
								width:'100%', 
								height:windowHeight * 0.1, 
								resizeMode: "stretch"
							}}
						/>
					</View>
					<View style={styles.textContainer}>
						
						<View>
							<View style={styles.iconAndTextContainer}>
								<Icon
								  // raised
								  name={utils.categoryIcon}
								  type='font-awesome'
								  iconStyle='Outlined'
								  color={utils.mediumGrey}
								  size={22}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
								<Text style={styles.attributesText}>
									Category: { data.category }
								</Text>
							</View>
							
							<View style={styles.iconAndTextContainer}>
								<Icon
								  // raised
								  name={utils.categoryIcon}
								  type='font-awesome'
								  iconStyle='Outlined'
								  color={utils.mediumGrey}
								  size={22}
								  // onPress={() => console.log('hello')} 
								  // reverse={true}
								/>
								<Text style={styles.attributesText}>
									ss{ data.timestamp_of_uploading }
								</Text>
							</View>
						</View>

						<Text>
							{ data.initial_tags }
						</Text>
					</View>
					
				</View>				
			</View>
		);
	}
}
	
ComponentForShowingBlogPost.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		height:windowHeight * 0.18,
		width: windowWidth,
		alignSelf:'center',
		// backgroundColor: '#000000',
		// alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor:utils.dimWhite,
	},
	innerContainer:{
		flexDirection: 'row',
		// backgroundColor: 'green',
		alignSelf:'center',
		width: '90%'
	},

// titleStyle
	titleStyle:{
		textAlign:'center',
		width: '90%',
		alignSelf:'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: windowHeight * 0.02
	},

	imageContainer:{
		flex:2,
		marginRight:10,
	},
	textContainer:{
		flex:3,
	},

// icon and text
	iconAndTextContainer:{
		flexDirection:'row',
	},
	attributesText:{
		marginLeft:20,
	},

});


export default ComponentForShowingBlogPost;
