import AsyncStorage from '@react-native-community/async-storage';

import { persistStore, persistReducer } from 'redux-persist' 
// import storage from 'redux-persist/lib/storage'

import {createStore, applyMiddleware} from "redux";
// import createSagaMiddleware from "redux-saga";
import { connect } from "react-redux";
import { combineReducers } from 'redux'; 


// IMPORT rootSaga
// import {rootSaga} from "../saga_stuff/saga_combined";

import {
	reducerForPrivileges,
	reducerJWT,
	reducerForBlogPost,
	reducerForComment,
	reducerForLike,
	reducerForUser,
	reducerForVideo,
	reducerForImage,
	// reducerForLike,
	// reducerForUser,
	// reducerForLike,
	// reducerForUser,
} from "./reducers"

export const rootReducer = combineReducers({
	blogposts: reducerForBlogPost,
	videos: reducerForVideo,
	images: reducerForImage,
	comments: reducerForComment,
	likes: reducerForLike,
	users: reducerForUser,
	privileges: reducerForPrivileges,
});

export const mapStateToProps = state => {
	return {

		show_blogpost_comments:state.blogposts.showOnlyCommentsQuantityForBlogPost,
		show_image_comments:state.images.showOnlyCommentsQuantityForImage,
		show_video_comments:state.videos.showOnlyCommentsQuantityForVideo,

		show_blogpost_likes:state.blogposts.showOnlyLikesQuantityForBlogPost,
		show_image_likes:state.images.showOnlyLikesQuantityForImage,
		show_video_likes:state.videos.showOnlyLikesQuantityForVideo,



		total_blogposts: state.blogposts.totalBlogPost,
		current_blogpost: state.blogposts.currentBlogPost,

		total_videos: state.videos.totalVideo,
		current_video: state.videos.currentVideo,

		total_images: state.images.totalImage,
		current_image: state.images.currentImage,

		userToken: state.users.userToken,
		isSignedIn: state.users.isSignedIn,
		user_name: state.users.user_name,
		phone_number: state.users.phone_number,
		user_image: state.users.user_image,
		// hash: state.users.hash,
		// salt: state.users.salt,

		isAllowedBasic: state.privileges.isAllowedBasic,
		isAllowedImagesControl: state.privileges.isAllowedImagesControl,
		isAllowedVideosControl: state.privileges.isAllowedVideosControl,
		isAllowedBlogpostsControl: state.privileges.isAllowedBlogpostsControl,

	};
};

export const mapDispatchToProps = dispatch => {
	return {
		toggle_show_comments_for_blogpost: () => dispatch( {type: "TOGGLE_COMMENT_QUANTITY_FOR_BLOSPOST"} ),
		toggle_show_comments_for_video: () => dispatch( {type: "TOGGLE_COMMENT_QUANTITY_FOR_VIDEO"} ),
		toggle_show_comments_for_image: () => dispatch( {type: "TOGGLE_COMMENT_QUANTITY_FOR_IMAGE"} ),

		toggle_show_likes_for_blogpost: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_BLOSPOST"} ),
		toggle_show_likes_for_video: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_VIDEO"} ),
		toggle_show_likes_for_image: () => dispatch( {type: "TOGGLE_LIKE_QUANTITY_FOR_IMAGE"} ),



		set_is_signed_in: (booleon) => dispatch( { type:"SET_IS_SIGNED_IN", booleon: booleon } ),
		set_user_token: (token) => dispatch( { type:"SET_USER_TOKEN", token: token } ),
		set_user_name: (user_name) => dispatch( { type: "SET_USER_NAME", user_name: user_name} ),
		remove_user_name: () => dispatch( { type: "REMOVE_USER_NAME" } ),
		set_phone_number: (phone_number) => dispatch( { type: "SET_PHONE_NUMBER", phone_number: phone_number} ),
		remove_phone_number: () => dispatch( { type: "REMOVE_PHONE_NUMBER" } ),
		set_user_image: (user_image) => dispatch( { type: "SET_USER_IMAGE", user_image: user_image} ),
		remove_user_image: () => dispatch( { type: "REMOVE_USER_IMAGE" } ),

		set_current_blogpost: (current_blogpost) => dispatch( { type: "SET_CURRENT_BLOGPOST", current_blogpost:current_blogpost } ),
		set_fetched_blogposts: (blogpost_list) => dispatch( { type: "SET_FETCHED_BLOGPOST", blogpost_list: blogpost_list } ),
		set_fetched_10_more_blogpost: (blogpost_list) => dispatch( { type: "SET_FETCHED_10_MORE_BLOGPOST", blogpost_list: blogpost_list } ),

		add_comment_to_blogpost: (blogpost_id, comment_object) => dispatch( { type: "ADD_COMMENT_TO_BLOGPOST", blogpost_id: blogpost_id, comment_object: comment_object } ),
		remove_comment_from_blogpost: (blogpost_id, comment_object, comment_id) => dispatch( { type: "REMOVE_COMMENT_FROM_BLOGPOST", blogpost_id: blogpost_id, comment_object: comment_object, comment_id: comment_id } ),
		add_like_to_blogpost: (blogpost_id, like_object) => dispatch( { type: "ADD_LIKE_TO_BLOGPOST", blogpost_id: blogpost_id, like_object: like_object } ),
		remove_like_from_blogpost: (blogpost_id, like_object, like_id) => dispatch( { type: "REMOVE_LIKE_FROM_BLOGPOST", blogpost_id: blogpost_id, like_object: like_object, like_id: like_id } ),

		set_current_video: (current_video) => dispatch( { type: "SET_CURRENT_VIDEO", current_video:current_video } ),
		set_fetched_videos: (video_list) => dispatch( { type: "SET_FETCHED_VIDEO", video_list: video_list } ),
		set_fetched_10_more_video: (video_list) => dispatch( { type: "SET_FETCHED_10_MORE_VIDEO", video_list: video_list } ),

		add_comment_to_video: (video_id, comment_object) => dispatch( { type: "ADD_COMMENT_TO_VIDEO", video_id: video_id, comment_object: comment_object } ),
		remove_comment_from_video: (video_id, comment_object, comment_id) => dispatch( { type: "REMOVE_COMMENT_FROM_VIDEO", video_id: video_id, comment_object: comment_object, comment_id: comment_id } ),
		add_like_to_video: (video_id, like_object) => dispatch( { type: "ADD_LIKE_TO_VIDEO", video_id: video_id, like_object: like_object } ),
		remove_like_from_video: (video_id, like_object, like_id) => dispatch( { type: "REMOVE_LIKE_FROM_VIDEO", video_id: video_id, like_object: like_object, like_id: like_id } ),

		set_current_image: (current_image) => dispatch( { type: "SET_CURRENT_IMAGE", current_image:current_image } ),
		set_fetched_images: (image_list) => dispatch( { type: "SET_FETCHED_IMAGE", image_list: image_list } ),
		set_fetched_10_more_image: (image_list) => dispatch( { type: "SET_FETCHED_10_MORE_IMAGE", image_list: image_list } ),

		add_comment_to_image: (image_id, comment_object) => dispatch( { type: "ADD_COMMENT_TO_IMAGE", image_id: image_id, comment_object: comment_object } ),
		remove_comment_from_image: (image_id, comment_object, comment_id) => dispatch( { type: "REMOVE_COMMENT_FROM_IMAGE", image_id: image_id, comment_object: comment_object, comment_id: comment_id } ),
		add_like_to_image: (image_id, like_object) => dispatch( { type: "ADD_LIKE_TO_IMAGE", image_id: image_id, like_object: like_object } ),
		remove_like_from_image: (image_id, like_object, like_id) => dispatch( { type: "REMOVE_LIKE_FROM_IMAGE", image_id: image_id, like_object: like_object, like_id: like_id } ),

		allow_basic_privilege: () => dispatch( { type: "ALLOW_BASIC" } ),
		allow_images_privilege: () => dispatch( { type: "ALLOW_IMAGES_CONTROL" } ),
		allow_videos_privilege: () => dispatch( { type: "ALLOW_VIDEOS_CONTROL" } ),
		allow_blogpost_privilege: () => dispatch( { type: "ALLOW_BLOGPOSTS_CONTROL" } ),		
		revoke_basic_privilege: () => dispatch( { type: "REVOKE_BASIC" } ),
		revoke_images_privilege: () => dispatch( { type: "REVOKE_IMAGES_CONTROL" } ),
		revoke_videos_privilege: () => dispatch( { type: "REVOKE_VIDEOS_CONTROL" } ),
		revoke_blogpost_privilege: () => dispatch( { type: "REVOKE_BLOGPOSTS_CONTROL" } ),

	};

};

// const sagaMiddleWare = createSagaMiddleware();


// persistConfig for REACT
// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	blacklist: [
// 		'total_blogposts',
// 		'current_blogpost',
// 		'total_videos',
// 		'current_video',
// 		'total_images',
// 		'current_image',
// 	],
// }


// persistConfig for REACT NATIVE
const persistConfig = {
	// storage,
	storage: AsyncStorage,
	
	key: 'root',
	blacklist: [
		'total_blogposts',
		'current_blogpost',
		'total_videos',
		'current_video',
		'total_images',
		'current_image',
		'userToken',
		'isSignedIn',
	],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer
	// , applyMiddleware(sagaMiddleWare)
);
export const persistor = persistStore(store)

// sagaMiddleWare.run(rootSaga);