
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import AppNavigation from "../the_navigation";

import {
	SocialPostScreen,
	IndividualSocialPostScreen,
	AdvertisementScreen,
	IndividualAdvertisementScreen,
	PageScreen,
	IndividualPageScreen,
	BookScreen,
	IndividualBookScreen,
	SportScreen,
	IndividualSportScreen,	
	LoginScreen,

} from "../screens";


import {
	CreateSocialPost,
	ComponentForShowingSocialPost,
	SocialPostCard,
} from "../components/socialposts"

import {
	CreateAdvertisement,
	ComponentForShowingAdvertisement,
	AdvertisementCard,
} from "../components/advertisements"

import {
	CreatePage,
	ComponentForShowingPage,
	PageCard,
} from "../components/pages"

import {
	CreateBook,
	ComponentForShowingBook,
	BookCard,
} from "../components/books"

import {
	CreateSport,
	ComponentForShowingSport,
	SportCard,
} from "../components/sports"

import {
	CreateComment,
} from "../components/comments"

import {
	CreateLike,
} from "../components/likes"

import {
	CreateShare,
} from "../components/shares"

export const ConnectedAppNavigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppNavigation);

export const ConnectedLoginScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);


export const ConnectedCreateSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSocialPost);

export const ConnectedSocialPostCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SocialPostCard);

export const ConnectedComponentForShowingSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingSocialPost);

export const ConnectedCreateComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment);

export const ConnectedCreateLike = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLike);

export const ConnectedCreateShare = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateShare);

export const ConnectedCreateAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAdvertisement);

export const ConnectedAdvertisementCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvertisementCard);

export const ConnectedComponentForShowingAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingAdvertisement);

export const ConnectedCreatePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatePage);

export const ConnectedPageCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageCard);

export const ConnectedComponentForShowingPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingPage);

export const ConnectedCreateBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateBook);

export const ConnectedBookCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(BookCard);

export const ConnectedComponentForShowingBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingBook);

export const ConnectedCreateSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSport);

export const ConnectedSportCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SportCard);

export const ConnectedComponentForShowingSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingSport);


export const ConnectedIndividualSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualSocialPost);

export const ConnectedSocialPostScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SocialPostScreen);



export const ConnectedIndividualAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualAdvertisement);

export const ConnectedAdvertisementScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvertisementScreen);



export const ConnectedIndividualPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualPage);

export const ConnectedPageScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageScreen);



export const ConnectedIndividualBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBook);

export const ConnectedBookScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(BookScreen);



export const ConnectedIndividualSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualSport);

export const ConnectedSportScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SportScreen);

