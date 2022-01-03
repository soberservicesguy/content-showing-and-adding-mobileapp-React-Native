import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';

import axios from 'axios';

import utils from "../utilities";

import Video from 'react-native-video'

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class IndividualVideo extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			current_video: this.props.current_video
		}	
	}

	onBuffer(){
		console.log('BUFFERING')
	}
	videoError(err){
		console.log(err)
	}

// COMPONENT DID MOUNT
	componentDidMount() {
		console.log({ video_filepath: this.props.current_video.video_filepath })
// FETCHING DATA FOR COMPONENT
	}


	componentDidUpdate(prevProps, prevState, snapshot){
		if (!prevProps.current_video && this.props.current_video){
			console.log('video available, setting now')
			this.setState(() => {current_video: this.props.current_video})
		}
	}


// RENDER METHOD
	render() {


	  	return (
	  		<View>
			    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
			    	{this.state.current_video.title}
			    </Text>
	  			<Video 
					controls={true}
					source={{uri: 'http://d33yizdt8hggvw.cloudfront.net/' + this.state.current_video?.video_filepath, mainVer: 1, patchVer: 0}} 
					resizeMode="cover"
					ref={(ref) => {
						this.player = ref
					}}
					allowsExternalPlayback={true}
					// audioOnly={false}
					onBuffer={this.onBuffer()}
					onError={(err) => this.videoError(err)}
					style={{
						position: 'relative',
						top: 20,
						left: 0,
						bottom: 0,
						right: 0,
						height:400,
						// width:300, 
						// resizeMode:'none',
						// marginTop:100
					}}
			       />
		       <View style={{postition:'relative', top: 30, paddingHorizontal: 10}}>
				    <Text style={{fontSize:12}}>
				    	Category: {this.state.current_video.category}
				    </Text>
				    <Text>
				    	Description:
				    </Text>
				    <Text>
				    	{this.state.current_video.description}
				    </Text>
		       </View>
	  		</View>
	  			
		);
	}
}
	

export default IndividualVideo;