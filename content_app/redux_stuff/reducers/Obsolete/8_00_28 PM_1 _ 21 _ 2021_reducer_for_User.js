const initialState = {

	isSignedIn: false,
	userToken: null,

	user_name:'dummy',
	phone_number:'dummy',
	user_image:'dummy',
	hash:'dummy',
	salt:'dummy',
}

const reducerForUser = (state = initialState, action) => {

	switch (action.type) {

		case "SET_IS_SIGNED_IN":

			return {...state, isSignedIn: action.booleon}
			break;

		case "SET_USER_TOKEN":

			return {...state, userToken: action.token}
			break;

		case "SET_USER_NAME":

			return {...state, user_name: action.user_name}
			break;

		case "REMOVE_USER_NAME":

			return {...state, user_name: null}
			break;

		case "SET_PHONE_NUMBER":

			return {...state, phone_number: action.phone_number}
			break;

		case "REMOVE_PHONE_NUMBER":

			return {...state, phone_number: null}
			break;

		case "SET_USER_IMAGE":

			return {...state, user_image: action.user_image}
			break;

		case "REMOVE_USER_IMAGE":

			return {...state, user_image: null}
			break;

		case "SET_HASH":

			return {...state, hash: action.hash}
			break;

		case "REMOVE_HASH":

			return {...state, hash: null}
			break;

		case "SET_SALT":

			return {...state, salt: action.salt}
			break;

		case "REMOVE_SALT":

			return {...state, salt: null}
			break;

		default:

			return state

	}

};

export default reducerForUser;
