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

// FETCHING DATA FOR COMPONENT
	}


// RENDER METHOD
	render() {

		// console.log('ENDPOINT REQUEST')
		// console.log(this.props.current_video.video_filepath)

	  	return (
	  		<View>
	  			{/*<Text>this</Text>*/}
		  		{/*<Video 
					// source={{uri: "background"}}
					// source={{uri: `http://localhost:3001/video/video?endpoint=${this.props.current_video.video_filepath}`}} 
					source={{uri: this.props.current_video.video_filepath}} 
		  		/>*/}
	
	  			<Video 
		  			// source={{uri: "background"}}   // Can be a URL or a local file.
					controls={true}
					source={{uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4' }}

					// source={{uri: 'http://d33yizdt8hggvw.cloudfront.net/' + this.props.current_video.video_filepath, mainVer: 1, patchVer: 0}} 
	  			         resizeMode="cover"
	  			       ref={(ref) => {
	  			         this.player = ref
	  			       }}
	  			       allowsExternalPlayback={true}
	  			       // audioOnly={false}                                      // Store reference
	  			       onBuffer={this.onBuffer()}                // Callback when remote video is buffering
	  			       onError={(err) => this.videoError(err)}               // Callback when video cannot be loaded
			  			styles={{
			  				position: 'absolute',
			  				    top: 1000,
			  				    left: 0,
			  				    bottom: 0,
			  				    // right: 0,
			  				width:400, height:300, 
			  				// resizeMode:'none', marginTop:100
			  			}}
	  			       // style={styles.backgroundVideo} 
			       />
	  		</View>
	  			
		);
	}
}
	
IndividualVideo.defaultProps = {
	//:,
};

const styles = StyleSheet.create({
	container: {
	},
	bigBlue: {
	},
});

export default IndividualVideo;