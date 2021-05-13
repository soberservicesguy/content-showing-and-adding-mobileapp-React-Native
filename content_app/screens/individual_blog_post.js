import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Image,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class IndividualBlogPost extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {

		var base64Image = "data:image/jpeg;base64," + this.props.current_blogpost.image_main

		return (
			<View style={styles.imageContainer}>
				<Image source={base64Image} alt="" 
					style={{
						width:200, 
						height:400, 
						resizeMode: "contain"
					}}
				/>

				<Text>
					{this.props.current_blogpost.category}
				</Text>
			</View>
		);
	}
}
	
IndividualBlogPost.defaultProps = {
	//:,
};

const styles = StyleSheet.create({
	container: {
	},
	bigBlue: {
	},
});

export default IndividualBlogPost