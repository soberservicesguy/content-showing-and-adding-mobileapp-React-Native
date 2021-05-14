import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Image,
	ScrollView,
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

	}
	
// RENDER METHOD
	render() {

		console.log('this.props.current_blogpost')
		console.log(Object.keys(this.props.current_blogpost))

  		var base64Image = "data:image/jpeg;base64," + this.props.current_blogpost.image_main_filepath

  		let image_to_use 
  		if (typeof this.props.route.params === 'undefined'){

  			image_to_use = base64Image
  	
  		} else {

  			image_to_use = this.props.route.params.image_main_filepath
  	
	  	}



		return (
			<ScrollView contentContainerStyle={{paddingBottom:100}}>

				<View style={styles.imageContainer}>
					<Text style={{textAlign:'center', fontWeight:'bold', fontSize:20, marginTop:50}}>
						{this.props.current_blogpost.title}
					</Text>

					<Image 
						// source={{uri: this.props.route.params.image_main_filepath}} 
						source={{uri: image_to_use}} 
						alt="" 
						style={{
							width:windowWidth, 
							height:400, 
							resizeMode: "stretch"
						}}
					/>

					<Text style={{fontSize:18,  color: 'purple'}}>
						Category: {this.props.current_blogpost.category}
					</Text>

					<Text style={{fontSize:18, marginTop:20}}>
						{this.props.current_blogpost.first_para}
					</Text>

					<Text style={{fontSize:18, marginTop:20}}>
						{this.props.current_blogpost.second_para}
					</Text>

					<Text style={{fontSize:18, marginTop:20}}>
						{this.props.current_blogpost.third_para}
					</Text>

					<Text style={{fontSize:18, width:'80%', textAlign:'center', marginTop:20}}>
						"{this.props.current_blogpost.qouted_para}"
					</Text>

					<Text style={{fontSize:18, marginTop:20}}>
						{this.props.current_blogpost.fourth_para}
					</Text>

					<Text style={{marginTop:20, fontWeight: 'bold', marginTop:20}}>
						Tags: {this.props.current_blogpost.initial_tags}
					</Text>

				</View>
			</ScrollView>
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