const utils = {
	baseUrl:'https://content-mern-stack.herokuapp.com',
	// baseUrl:'http://localhost:3000/',
	
	urlForProducts:'',

	image:require('./images/samosa.jpg'),

// login screen
	// BG Image
	// firstScreenBG: require('./images/samosa.jpg'),
	firstScreenBG: require('./images/first_screen.jpg'),

	// COLORS
	dimWhite:'#d6d6d6',
	darkGrey: '#4e5252',
	mediumGrey: '#7d807f',
	orange: '#e96d3e',
	// ICON
	userIcon: 'user',
	passwordIcon: 'lock',
	phoneNumber: 'phone',

// sign up screen
	// BG Image
	secondScreenBG: require('./images/second_screen.jpg'),
	// COLORS
	black:"black",

// component for showing blogpost
	categoryIcon:'archive',

// component for showing video
	timestampIcon: 'arrow-up',
	playButtonIcon:'play',

// summarize_comments_of_image
	commentIcon: 'comment', 
// summarize_likes_of_image
	likeIcon: 'thumbs-up',

	lightGrey: "#bbbdc0",
	darkBlue: '#1e5186',
	lightGreen: '#acce4c',
	// ICON
	righAeroIcon:'arrow-right',

// signin screen
	// COLORS

	// ICON


// products screen
	lightBlue:'#2ba1fb',


}

export default utils