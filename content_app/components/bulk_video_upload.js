import React, { Component } from 'react';
import { 
	StyleSheet,
	View, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	Button,
} from "react-native";
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios from 'axios';

import DocumentPicker from 'react-native-document-picker';

import utils from "../utilities";

class BulkVideoUpload extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			switchScreen: false,
			videos_to_upload: [],
			excel_sheet:'',
		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		// const endpoint_params_passed = this.props.match.params

		if ( this.state.switchScreen !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))

			// redirecting
			this.props.navigation.navigate('Individual-Video', {
				itemId: 86,
				otherParam: 'anything you want here',
			})

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<View style={styles.outerContainer}>

{/*imagepicker doesnt support multiple files*/}
					<View style={styles.textinputContainer}>

						<Button 
							title={'UPLOAD VIDEOS HERE'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									const results = await DocumentPicker.pickMultiple({
										type: [
											'video/3gpp',
											'video/mpeg',
											'video/x-msvideo', // go to for all mimetypes https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
											'video/mp4', // go to for all mimetypes https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
										],
									});
									// setState method with response as argument
									this.setState(prev => ({...prev, videos_to_upload: results}))
									// results.map((res) => {
										// console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// })
								} catch (err) {
									if (DocumentPicker.isCancel(err)) {
										// User cancelled the picker, exit any dialogs or menus and move on
									} else {
										console.log(err)
										// throw err;
									}
								}
							}}
						/>
					</View>


					<View style={styles.textinputContainer}>
						<Button 
							title={'UPLOAD VIDEOS EXCEL SHEET HERE'}
							style={styles.buttonWithoutBG}
							onPress={async () => {
								try {
									let res = await DocumentPicker.pick({
										type: [
											DocumentPicker.types.xls,
											DocumentPicker.types.xlsx,
										],
									});
									console.log(res.uri, res.type, res.name, res.size); // res.type is mimeType
									// setState method with response as argument
									this.setState(prev => ({...prev, excel_sheet: res}))

								} catch (err) {

									if (DocumentPicker.isCancel(err)) {
										// User cancelled the picker, exit any dialogs or menus and move on
									} else {
										console.log(err)
										// throw err;
									}
								}
							}}
						/>
					</View>


					<Button 
						title={'Press To Create Bulk Videos'}
						style={styles.buttonWithoutBG}
						onPress={ () => {

							// let setResponseInFetchedVideos = (arg) => this.props.set_fetched_videos(arg)
							let redirectToNewVideos = () => this.setState(prev => ({...prev, switchScreen: (prev.switchScreen === false) ? true : false }))	

							// in formData send individual variables and not a complete object
							// formData.append('video_object', video_object) // THIS WILL NOT WORK, SENT VARS INDIVIDUALLY
							const formData = new FormData()
							// attaching multiple files with formData

							Array.from(this.state.videos_to_upload).forEach((file) => {
								formData.append('videos_to_upload', {uri: file.uri, name: file.name, type: file.type})
							})
							formData.append('excel_sheet', {uri: this.state.excel_sheet.uri, name: this.state.excel_sheet.name, type: this.state.excel_sheet.type})

							axios.post(utils.baseUrl + '/uploads/bulk-upload-videos', formData)
							.then(function (response) {
								console.log(response.data) // current blogpost screen data
								
								// set to current parent object
								// setResponseInFetchedVideos(response.data.new_blogpost)

								// change route to current_blogpost
								redirectToNewVideos()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					/>

					<Button
						title={'Press To DELETE ALL VIDEOS'} 
						style={styles.buttonWithoutBG}
						onPress={ () => {
							axios.get(utils.baseUrl + '/uploads/bulk-delete-videos')
							.then(function (response) {
								console.log(response.data)
							})
							.catch(function (error) {
								console.log(error)
							});
						}}
					/>

				</View>
			);
		}			
	}
}
	
BulkVideoUpload.defaultProps = {

};


const styles = StyleSheet.create({
	outerContainer:{
		flexDirection: 'column',
		alignItems:'center',
		flex:1,
		// display:'flex',
		// flexDirection: 'column',
		alignItems:'center',
		justifyContent: 'space-around', 
	},
});

// export default BulkVideoUpload // REMOVE withResponsiveness and withStyles as much as possible
export default BulkVideoUpload