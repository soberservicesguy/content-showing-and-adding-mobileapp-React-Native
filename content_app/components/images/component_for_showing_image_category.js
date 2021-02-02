import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/blog_post"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';

class ComponentForShowingImageCategory extends Component {
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
				<ImageBackground 
					source={utils.image} 
					style={{
						// width:windowWidth * 0.2,
						width:'100%', 
						height:windowHeight * 0.3, 
						resizeMode: "stretch"
					}}
				>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{ data.category }
						</Text>
					</View>
					
				</ImageBackground>
			</View>
		);
	}
}
	
ComponentForShowingImageCategory.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
		height:windowHeight * 0.3,
		width: windowWidth,
		alignSelf:'center',
		marginBottom:windowHeight * 0.01,
		// marginLeft:windowWidth * 0.05/4,
		// marginRight:windowWidth * 0.05/4,
		// backgroundColor: '#000000',
		// alignItems: 'center',
	},

	textContainer:{
		backgroundColor: '#000000',
		height:windowHeight * 0.08,
		justifyContent: 'center',
		marginTop:windowHeight * ( 0.3 - 0.08 ),
		// opacity: 0.75,
	},
	text:{
		color: 'white',
		marginLeft:20,
		fontSize: 18,
		fontWeight:'bold',
		textAlign:'center',
	},

});


export default ComponentForShowingImageCategory;
