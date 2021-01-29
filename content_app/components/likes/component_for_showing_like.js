import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	Modal,
	TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { Consumer } from "../../screens/image"

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class ComponentForShowingLike extends Component {
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

		const data = this.props.componentData // data being plugged from parent flatlist		
		var base64Image = "data:image/jpeg;base64," + data.user_image

		return (
			<View style={styles.outerContainer}>
				<Text>
					{data.user_name}
				</Text>

				<View style={styles.imageContainer}>
					<Image source={base64Image} alt="" 
						style={{
							width:100, 
							height:100, 
							resizeMode: "contain"
						}}
					/>
				</View>
			</View>
		);
	}
}
	
ComponentForShowingLike.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},
});


export default ComponentForShowingLike;