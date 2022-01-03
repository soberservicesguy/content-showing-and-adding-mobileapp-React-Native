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
import moment from 'moment';

class ComponentForShowingBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			image_src: null,
		}

	}

	getImage(){

		// this.setState({ image_src: null })
		let image_object_id = this.props.dataPayloadFromParent.image_main_filepath

		axios.get(`${utils.baseUrl}/blogpostings/get-image`, 
			{
				params: {
					image_object_id: image_object_id
				}
			}
		)
	    .then(async (response) => {
	    	if (response.data.success){
		    	this.setState({ image_src: "data:image/jpeg;base64," + response.data.image})
	    	}

		})
		.catch((err) => {
			console.log(err)
		})


	}

// COMPONENT DID MOUNT
	componentDidMount() {
		this.getImage()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {


		if (prevProps.getIndividualImage === false && this.props.getIndividualImage === true){
			console.log('getting image')
			this.getImage()

		}

	}


	render() {

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist
		var base64Image = "data:image/jpeg;base64," + data.image_main_filepath

		return (
			<TouchableOpacity activeOpacity={0.2} style={styles.outerContainer} onPress={() => {
				this.props.set_current_blogpost(data)
				this.props.navigation.navigate('Individual_BlogPost', {image_main_filepath: this.state.image_src})
			}}>

				<Text style={styles.titleStyle}>
					{ data.title }
				</Text>
				<View style={styles.innerContainer}>
					<View style={styles.imageContainer}>
						<Image 
							source={{uri: this.state.image_src}}
							// source={base64Image}
							// source={utils.image}
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
									{ moment.unix(data.timestamp_of_uploading / 1000).format("MM/DD/YYYY") }
								</Text>
							</View>
						</View>

						<Text>
							{ data.initial_tags }
						</Text>
					</View>
					
				</View>				

			</TouchableOpacity>
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
