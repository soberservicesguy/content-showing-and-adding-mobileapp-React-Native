
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import { connect } from "react-redux";
import { combineReducers } from 'redux'; 


// IMPORT rootSaga
import {rootSaga} from "../saga_stuff/saga_combined";

import {
	reducerJWT,
	reducerForCarousel,
	reducerForProduct,
	reducerForOrder,
	reducerForUser,
	reducerForBlogPost,
} from "./reducers"

export const rootReducer = combineReducers({
	carousels: reducerForCarousel,
	products: reducerForProduct,
	orders: reducerForOrder,
	users: reducerForUser,
	blogposts: reducerForBlogPost,
});

export const mapStateToProps = state => {
  return {

	total_carousels: state.carousels.totalCarousel,
	current_carousel: state.carousels.currentCarousel,

	total_products: state.products.totalProduct,
	current_product: state.products.currentProduct,

	total_orders: state.orders.totalOrder,
	current_order: state.orders.currentOrder,

	userToken: state.users.userToken,
	isSignedIn: state.users.isSignedIn,
	user_name: state.users.user_name,
	phone_number: state.users.phone_number,
	hash: state.users.hash,
	salt: state.users.salt,
	isloggedin: state.users.isloggedin,
	total_blogposts: state.blogposts.totalBlogPost,
	current_blogpost: state.blogposts.currentBlogPost,

	cart: state.carousels.cart,

	current_cart_item: state.carousels.current_cart_item,

	cart: state.products.cart,

	current_cart_item: state.products.current_cart_item,

	cart: state.orders.cart,

	current_cart_item: state.orders.current_cart_item,

	cart: state.blogposts.cart,

	current_cart_item: state.blogposts.current_cart_item,

	};
};

export const mapDispatchToProps = dispatch => {
	return {

		set_current_carousel: (current_carousel) => dispatch( { type: "SET_CURRENT_CAROUSEL", current_carousel:current_carousel } ),
		set_fetched_carousels: (carousel_list) => dispatch( { type: "SET_FETCHED_CAROUSEL", carousel_list: carousel_list } ),
		set_fetched_10_more_carousel: (carousel_list) => dispatch( { type: "SET_FETCHED_10_MORE_CAROUSEL", carousel_list: carousel_list } ),


		set_current_product: (current_product) => dispatch( { type: "SET_CURRENT_PRODUCT", current_product:current_product } ),
		set_fetched_products: (product_list) => dispatch( { type: "SET_FETCHED_PRODUCT", product_list: product_list } ),
		set_fetched_10_more_product: (product_list) => dispatch( { type: "SET_FETCHED_10_MORE_PRODUCT", product_list: product_list } ),


		set_current_cart_item: (cart_item) => dispatch( { type: "SET_CURRENT_CART_ITEM", cart_item: cart_item } ),
		add_product_to_cart: (product_id) => dispatch( { type: "ADD_PRODUCT_TO_CART", product_id: product_id } ),
		remove_product_from_cart: (product_id) => dispatch( { type: "REMOVE_PRODUCT_FROM_CART", product_id: product_id } ),
		set_current_order: (current_order) => dispatch( { type: "SET_CURRENT_ORDER", current_order:current_order } ),
		set_fetched_orders: (order_list) => dispatch( { type: "SET_FETCHED_ORDER", order_list: order_list } ),
		set_fetched_10_more_order: (order_list) => dispatch( { type: "SET_FETCHED_10_MORE_ORDER", order_list: order_list } ),

		set_is_signed_in: (booleon) => dispatch( { type:"SET_IS_SIGNED_IN", booleon: booleon } ),
		set_user_token: (token) => dispatch( { type:"SET_USER_TOKEN", token: token } ),

		set_user_name: (user_name) => dispatch( { type: "SET_USER_NAME", user_name: user_name} ),
		remove_user_name: () => dispatch( { type: "REMOVE_USER_NAME" } ),
		set_phone_number: (phone_number) => dispatch( { type: "SET_PHONE_NUMBER", phone_number: phone_number} ),
		remove_phone_number: () => dispatch( { type: "REMOVE_PHONE_NUMBER" } ),
		set_hash: (hash) => dispatch( { type: "SET_HASH", hash: hash} ),
		remove_hash: () => dispatch( { type: "REMOVE_HASH" } ),
		set_salt: (salt) => dispatch( { type: "SET_SALT", salt: salt} ),
		remove_salt: () => dispatch( { type: "REMOVE_SALT" } ),
		set_isloggedin: (isloggedin) => dispatch( { type: "SET_ISLOGGEDIN", isloggedin: isloggedin} ),
		remove_isloggedin: () => dispatch( { type: "REMOVE_ISLOGGEDIN" } ),

		set_current_blogpost: (current_blogpost) => dispatch( { type: "SET_CURRENT_BLOGPOST", current_blogpost:current_blogpost } ),
		set_fetched_blogposts: (blogpost_list) => dispatch( { type: "SET_FETCHED_BLOGPOST", blogpost_list: blogpost_list } ),
		set_fetched_10_more_blogpost: (blogpost_list) => dispatch( { type: "SET_FETCHED_10_MORE_BLOGPOST", blogpost_list: blogpost_list } ),


	};

};

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);