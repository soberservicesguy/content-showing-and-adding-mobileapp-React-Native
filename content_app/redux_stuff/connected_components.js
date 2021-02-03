import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import AppNavigation from '../the_navigation'

import {
	BlogPostScreen,
	IndividualBlogPost,
	VideoScreen,
	IndividualVideo,
	ImageScreen,
	IndividualImage,	
	LoginScreen,
	SignUpScreen,
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
	CreateCommentForBlogpost,
	CreateCommentForImage,
	CreateCommentForVideo,
	SummarizeCommentsOfBlogPost,
	SummarizeCommentsOfImage,
	SummarizeCommentsOfVideo,
} from "../components/comments"


import {
	CreateLikeForVideo,
	CreateLikeForBlogpost,
	CreateLikeForImage,
	SummarizeLikesOfBlogPost,
	SummarizeLikesOfImage,
	SummarizeLikesOfVideo,
} from "../components/likes"

export const ConnectedSummarizeCommentsOfBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeCommentsOfBlogPost);

export const ConnectedSummarizeCommentsOfImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeCommentsOfImage);

export const ConnectedSummarizeCommentsOfVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeCommentsOfVideo);

export const ConnectedSummarizeLikesOfBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeLikesOfBlogPost);

export const ConnectedSummarizeLikesOfImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeLikesOfImage);

export const ConnectedSummarizeLikesOfVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeLikesOfVideo);






export const ConnectedAppNavigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppNavigation);

export const ConnectedLoginScreen= connect(
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

export const ConnectedCreateCommentForBlogpost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCommentForBlogpost);

export const ConnectedCreateCommentForImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCommentForImage);

export const ConnectedCreateCommentForVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCommentForVideo);

export const ConnectedCreateLikeForBlogpost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForBlogpost);

export const ConnectedCreateLikeForImage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForImage);

export const ConnectedCreateLikeForVideo = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForVideo);

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

export const ConnectedSignUpScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen);

