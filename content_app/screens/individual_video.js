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

// COMPONENT DID MOUNT
	componentDidMount() {

// FETCHING DATA FOR COMPONENT
	}

// RENDER METHOD
	render() {
		const { classes } = this.props;
	  	const {_xs, _sm, _md, _lg, _xl} = this.props

		console.log('ENDPOINT REQUEST')
		console.log(this.props.current_video)
	  	return (
	  		<View>

		  		<Video 
					source={{uri: `http://localhost:3001/video-stream/video?endpoint=${this.props.current_video}`}} 
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

	  		// <Grid container direction="row" spacing={4} style={{backgroundColor: '#eee'}} >

	  		// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>
	  		// 	</Grid>

	  		// 	<Grid item container direction="column" xs={12} sm={12} md={8} lg={6}>
	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>
	  		// 	</Grid>

	  		// 	<Grid item container direction="column" xs={12} sm={12} md={2} lg={3}>
	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>

	  		// 		<Grid item>
	  		// 		</Grid>
	  		// 	</Grid>

	  		// </Grid>