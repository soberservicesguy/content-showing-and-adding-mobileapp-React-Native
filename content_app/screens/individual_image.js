import React, { Component } from 'react';
import { 
	StyleSheet,
	Image,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class IndividualImage extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
		}	
	}

// COMPONENT DID MOUNT
	componentDidMount() {

	}

// RENDER METHOD
	render() {

  		var base64Image = "data:image/jpeg;base64," + this.props.current_image.image_filepath

  		let image_to_use 
  		if (typeof this.props.route.params === 'undefined'){
  	
  			image_to_use = base64Image
  	
  		} else {

  			image_to_use = this.props.route.params.image_main_filepath
  	
	  	}

	  	return (
	  		<View style={styles.imageContainer}>

				<Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, marginTop:50}}>
					{this.props.current_image.title}
				</Text>

	  			<Image 
					source={{uri: image_to_use}} 
	  				// alt="" 
					style={{
						width:windowWidth, 
						height:400, 
						resizeMode: "stretch"
					}}  				
				/>

				<Text style={{fontSize:18,  color: 'purple'}}>
					Category: {this.props.current_image.category}
				</Text>


				<Text style={{marginTop:20, fontWeight: 'bold'}}>
					Description: {this.props.current_image.description}
				</Text>


	  		</View>
		);
	}
}
	
IndividualImage.defaultProps = {
	//:,
};

const styles = StyleSheet.create({
	container: {
	},
	bigBlue: {
	},
});

export default IndividualImage