
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import AppNavigation from "../the_navigation";

import {
	BlogPostScreen,
	IndividualBlogPostScreen,
	VideoScreen,
	IndividualVideoScreen,
	ImageScreen,
	IndividualImageScreen,	
	LoginScreen,

} from "../screens";


import {
	CreateBlogPost,
	ComponentForShowingBlogPost,
	BlogPostCard,
} from "../components/blogposts"

import {
	CreateVideo,
	ComponentForShowingVideo,
	VideoCard,
} from "../components/videos"

import {
	CreateImage,
	ComponentForShowingImage,
	ImageCard,
} from "../components/images"

import {
	CreateComment,
} from "../components/comments"

import {
	CreateLike,
} from "../components/likes"

import {
	CreateComment,
} from "../components/comments"

import {
	CreateLike,
} from "../components/likes"

import {
	CreateComment,
} from "../components/comments"

import {
	CreateLike,
} from "../components/likes"

export const ConnectedAppNavigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppNavigation);

export const ConnectedLoginScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);


export const ConnectedCreateBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateBlogPost);

export const ConnectedBlogPostCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostCard);

export const ConnectedComponentForShowingBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingBlogPost);

export const ConnectedCreateComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment);

export const ConnectedCreateLike = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLike);

export const ConnectedCreateVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateVideo);

export const ConnectedVideoCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoCard);

export const ConnectedComponentForShowingVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingVideo);

export const ConnectedCreateComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment);

export const ConnectedCreateLike = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLike);

export const ConnectedCreateImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateImage);

export const ConnectedImageCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageCard);

export const ConnectedComponentForShowingImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingImage);

export const ConnectedCreateComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment);

export const ConnectedCreateLike = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLike);


export const ConnectedIndividualBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBlogPost);

export const ConnectedBlogPostScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostScreen);



export const ConnectedIndividualVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualVideo);

export const ConnectedVideoScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoScreen);



export const ConnectedIndividualImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualImage);

export const ConnectedImageScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageScreen);

