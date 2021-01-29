
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import AppNavigation from "../the_navigation";

import {
	CarouselScreen,
	IndividualCarouselScreen,
	ProductScreen,
	IndividualProductScreen,
	OrderScreen,
	IndividualOrderScreen,
	BlogPostScreen,
	IndividualBlogPostScreen,
	CartScreen,
	IndividualCartItem,	
	LoginScreen,

} from "../screens";


import {
	CreateCarousel,
	ComponentForShowingCarousel,
	CarouselCard,
} from "../components/carousels"

import {
	CreateProduct,
	ComponentForShowingProduct,
	ProductCard,
} from "../components/products"

import {
	CreateOrder,
	ComponentForShowingOrder,
	OrderCard,
} from "../components/orders"

import {
	CreateBlogPost,
	ComponentForShowingBlogPost,
	BlogPostCard,
} from "../components/blogposts"

import {
	ComponentForShowingCart,
} from "../components/cart"

export const ConnectedAppNavigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppNavigation);

export const ConnectedLoginScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);


export const ConnectedCreateCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCarousel);

export const ConnectedCarouselCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(CarouselCard);

export const ConnectedComponentForShowingCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingCarousel);

export const ConnectedCreateProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProduct);

export const ConnectedProductCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCard);

export const ConnectedComponentForShowingProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingProduct);

export const ConnectedCreateOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateOrder);

export const ConnectedOrderCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderCard);

export const ConnectedComponentForShowingOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingOrder);

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


export const ConnectedIndividualCarousel = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualCarousel);

export const ConnectedCarouselScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(CarouselScreen);



export const ConnectedIndividualProduct = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualProduct);

export const ConnectedProductScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductScreen);



export const ConnectedIndividualOrder = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualOrder);

export const ConnectedOrderScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderScreen);



export const ConnectedIndividualBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBlogPost);

export const ConnectedBlogPostScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostScreen);


export const ConnectedCartScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(CartScreen);

export const ConnectedComponentForShowingCart = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingCart);

export const ConnectedIndividualCartItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualCartItem);

