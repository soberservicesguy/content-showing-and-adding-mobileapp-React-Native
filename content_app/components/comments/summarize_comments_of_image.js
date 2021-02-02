import React, { Component } from 'react';
import { 
	FlatList,
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
} from "react-native";
import PropTypes from 'prop-types';
					
import axios from 'axios';

import utils from "../../utilities";

import { Consumer } from "../../screens/image"

import {
	ComponentForShowingComment
} from "."

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Icon } from 'react-native-elements';


class SummarizeCommentsOfImage extends Component {
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

		return (

			<View style={styles.outerContainer}>

				{( this.props.showOnlyQuantity ) ? (

					<View style={{
						flexDirection:'row'
					}}>
						<Icon
							// raised
							name={utils.commentIcon}
							type='font-awesome'
							iconStyle='Outlined'
							color='#f50'
							size={30}
							// onPress={() => console.log('hello')} 
							// reverse={true}
						/>
						<Text style={{
							marginLeft:10,
							fontSize:20,
						}}>
							Total comments {this.props.child_quantity}
						</Text>
					</View>

				) : (

			  		<FlatList
						style={{flexDirection: 'column', flexWrap : "wrap"}}
						numColumns={1}
			  			data={this.props.dataPayloadFromParent}
						renderItem={
							({ item }) => (
								<ComponentForShowingComment
									componentData = { item }
								/>
							)}
						keyExtractor={(item, index) => String(index)}
					/>

				)}
			</View>
		);
	}
}
	
SummarizeCommentsOfImage.defaultProps = {

};

const styles = StyleSheet.create({
	outerContainer: {
	},
});

export default SummarizeCommentsOfImage