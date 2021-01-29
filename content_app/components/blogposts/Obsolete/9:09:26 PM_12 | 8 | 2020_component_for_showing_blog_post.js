
import React, { Component } from 'react';
import PropTypes from 'prop-types';
					
import axios from 'axios';
import firebase from 'firebase';

import utils from "../../utilities";

import { withStyles } from '@material-ui/styles';
import withResponsiveness from "../../responsiveness_hook";

const styles = theme => ({
	outerContainer: {
	},
});

class ComponentForShowingBlogPost extends Component {
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

		const data = this.props.dataPayloadFromParent // data being plugged from parent flatlist

		return (
			<div style={styles.outerContainer}>
				<p>
					{ data.category }
				</p>
				<p>
					{ data.image_main }
				</p>
				<p>
					{ data.title }
				</p>
				<p>
					{ data.date_of_publishing }
				</p>
				<p>
					{ data.author_name }
				</p>
				<p>
					{ data.first_para }
				</p>
				<p>
					{ data.total_likes }
				</p>
				<p>
					{ data.total_shares }
				</p>
				<p>
					{ data.endpoint }
				</p>
				<p>
					{ data.initial_tags }
				</p>
				<p>
					{ data.second_para }
				</p>
				<p>
					{ data.qouted_para }
				</p>
				<p>
					{ data.third_para }
				</p>
				<p>
					{ data.fourth_para }
				</p>
				<p>
					{ data.all_tags }
				</p>
				<p>
					{ data.author_details }
				</p>
			</div>
		);
	}
}
	
ComponentForShowingBlogPost.defaultProps = {

};

// export default ComponentForShowingBlogPost;  // REMOVE withResponsiveness and withStyles as much as possible
export default withResponsiveness(withStyles(styles)(ComponentForShowingBlogPost))
