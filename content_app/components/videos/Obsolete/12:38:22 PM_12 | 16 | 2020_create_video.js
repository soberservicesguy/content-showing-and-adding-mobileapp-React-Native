
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import {
	TextField,
	Grid, 
	// Modal, 
	// Button 
} from "@material-ui/core";

import {
	withRouter,
	Redirect,
} from "react-router-dom";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

const styles = theme => ({
	root: {
		height: 48,
		color: props => (props.cool) ? 'red' : 'black',
		[theme.breakpoints.up('sm')]:{
			paddingLeft:100
		},
	},
	buttonWithoutBG:{
		marginTop:50,
		marginBottom:50,
	},
	innerText:{

	},
	textinputContainer:{
		// marginTop: windowHeight * 0.05, // or 30  gap
		// height: windowHeight * 0.1, // or 100
		width: '80%',
		justifyContent: 'center', // vertically centered
		alignSelf: 'center', // horizontally centered
		// backgroundColor: utils.lightGreen,
	},
	textinput:{
		marginTop:20,
		textAlign:'left',
		borderWidth:1,
		borderColor:(utils.lightGrey),
		borderStyle:'solid',
		paddingLeft:20,
		paddingTop:15,
		paddingBottom:15,
		fontSize:18,
	},
	outerContainer: {
	},
	bigBlue: {
	},
});


class CreateVideo extends Component {
	constructor(props) {
		super(props);
// STATE	
		this.state = {
			expanded:false,
			redirectToRoute: false,
			category: '',
			image_thumbnail: '',
			video_filename: '',
			title: '',
			endpoint: '',
			description: '',
			timestamp_of_uploading: '',
			all_tags: '',		}

	}


// COMPONENT DID MOUNT
	componentDidMount() {

	}

	render() {

		// parameters being passed from previous route
		const endpoint_params_passed = this.props.match.params

		if ( this.state.redirectToRoute !== false ){

			// switching it back to false
			this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))

			// redirecting
			return <Redirect to = {{ pathname: "/Individual-Video" }} />

		} else {

			return (
			// e.g a social post, textinput which lets user to enter text, takes persons id as assigned object
				<div style={styles.outerContainer}>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your category" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, category: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your image_thumbnail" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, image_thumbnail: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your video_filename" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, video_filename: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your title" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, title: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your endpoint" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, endpoint: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your description" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, description: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your timestamp_of_uploading" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, timestamp_of_uploading: event.target.value})) }
							/>
						</form>
				  	</div>


				  	<div style={styles.textinputContainer}>
						<form className={styles.root} noValidate autoComplete="off">
							<TextField 
								label="Type your all_tags" // placeholder 
								id="standard-basic" // "filled-basic" / "outlined-basic"
								variant="outlined" // "filled"
								classes={styles.textinput}
								onChange={ (event) => this.setState( prev => ({...prev, all_tags: event.target.value})) }
							/>
						</form>
				  	</div>

					<button style={styles.buttonWithoutBG}
						onClick={ () => {

							let setResponseInCurrentVideo = (arg) => this.props.set_current_video(arg)
							let redirectToNewVideo = () => this.setState(prev => ({...prev, redirectToRoute: (prev.redirectToRoute === false) ? true : false }))	

							// first create parent object
							let video_object = {
								category: this.state.category,
								image_thumbnail: this.state.image_thumbnail,
								video_filename: this.state.video_filename,
								title: this.state.title,
								endpoint: this.state.endpoint,
								description: this.state.description,
								timestamp_of_uploading: this.state.timestamp_of_uploading,
								all_tags: this.state.all_tags,
							}

							// 2nd create child object from redux (linked_object_and_live_object_in_redux in schema)
							let user_object = {

								user_name: this.props.user_name,
								phone_number: this.props.phone_number,
								user_image: this.props.user_image,
								hash: this.props.hash,
								salt: this.props.salt,
								user_name: this.props.user_name,
								phone_number: this.props.phone_number,
								user_image: this.props.user_image,
								hash: this.props.hash,
								salt: this.props.salt,
								user_name: this.props.user_name,
								phone_number: this.props.phone_number,
								user_image: this.props.user_image,
								hash: this.props.hash,
								salt: this.props.salt,
							}

							// 3rd send post request
							axios.post(utils.baseUrl + '/videos/create-video-with-user', 
								{
									video_object: video_object,
									user_object: user_object,
								})
							.then(function (response) {
								console.log(response.data) // current video screen data
								
								// set to current parent object
								setResponseInCurrentVideo(response.data)

								// change route to current_video
								redirectToNewVideo()

							})
							.catch(function (error) {
								console.log(error)
							});						

						}}
					>
						<p style={styles.innerText}>
							Press To Create Video
						</p>
					</button>
				</div>
			);
		}			
	}
}
	
CreateVideo.defaultProps = {

};

// export default CreateVideo // REMOVE withResponsiveness and withStyles as much as possible
export default withRouter(withResponsiveness(withStyles(styles)(CreateVideo)))
