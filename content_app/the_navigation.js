import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

// IMPORT created components
// import {
//	ButtonTouchableHighlight,
//	ImageAtLeftTextsAtRight,
//	Gap
// } from './components/ready_made_components';


// import {
// 	request_multiple_permissions,
// } from "./handy_functions/permissions_functions"

// IMPORT CONNECTED CONTAINERS
import {
	ConnectedLoginScreen,
	ConnectedSignUpScreen,
	ConnectedBlogPostScreen,
	ConnectedIndividualBlogPost,
	ConnectedVideoScreen,
	ConnectedIndividualVideo,
	ConnectedImageScreen,
	ConnectedIndividualImage,
} from "./redux_stuff/connected_components";

import {
	BulkImageUpload,
	BulkVideoUpload,
	BulkBlogpostUpload,
} from "./components/"





const Tabs = createBottomTabNavigator();

function BottomTabs({navigation}) {
	return (
		<Tabs.Navigator
			options={{ title: 'My home' }}
			// initialRouteName= 'FriendScreen'
			tabBar={() => 
				<View style={{
					display:'flex',
					flexDirection: 'row',
					alignItems:'center',
					justifyContent: 'space-around',
					height:50,
					backgroundColor: '#000000',
				}}>
					{[
						{option_name:'Bulk Blogposts', screen_name:"BulkBlogpostUpload"}, 
						{option_name:'Bulk Images',  screen_name:"BulkImageUpload"}, 
						{option_name:'Bulk Videos',  screen_name:"BulkVideoUpload"}, 
					].map((item, index) => {

						return (
							<TouchableOpacity activeOpacity={0.2} style={{alignItems:'center', alignSelf: 'center', justifyContent:'center',height:50, borderRightWidth:(index !== 2) ? 1 : 0, borderRightColor:'white', paddingHorizontal: 10}} onPress={ () => {
								navigation.navigate(item.screen_name)
								// navigation.navigate('Friendsection', {screen: 'FriendsScreen', params:{payload: item.screen_payload}} )
							}}>
								<Text style={{color:'blue', fontWeight:'bold', fontSize:20}}>
									{item.option_name}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			} // tabBar closed
			// backBehavior= 'initialRoute / order / history / none'

			// tabBarOptions={{
			//   activeTintColor:'',
			//   inactiveTintColor:'',
			//   activeBackgroundColor:'',
			//   inactiveBackgroundColor:'',
				
			//   showLabel: true / false,
			//   showIcon: true / false,

			//   labelPosition: 'beside-icon / below-icon'  
			//   tabStyle: // style object
			//   labelStyle: // style object
			//   style: // style object

			// }}

			// screenOptions={{
			//     title:'',
			//     tabBarVisible: true /false,
			//     tabBarIcon: , // function returning tab bar icon
			//     tabBarLabel: , // function returning label in tab bar
			//     tabBarButton: , // function returning tabbar button
			//   }}
		>

			<Tabs.Screen name="BulkBlogpostUpload" component={ BulkBlogpostUpload }
				options={{ 
					headerShown:true,
					title: 'Bulk Blogposts Upload',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<Tabs.Screen name="BulkImageUpload" component={ BulkImageUpload }
				options={{ 
					headerShown:true,
					title: 'Bulk Images Upload',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<Tabs.Screen name="BulkVideoUpload" component={ BulkVideoUpload }
				options={{ 
					headerShown:true,
					title: 'Bulk Videos Upload',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					// headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

		</Tabs.Navigator>
	)
} 













const Drawer = createDrawerNavigator();

// component returning drawer with screens
function ContentShowingDrawer({navigation}) {
	return (
		<Drawer.Navigator
			headerMode='none'
			// initialRouteName= ''
			// backBehavior= 'initialRoute / order / history / none'
			// drawerPosition= 'left / right'
			// drawerType='front / back / slide / permanent'
			hideStatusBar={false}
			drawerStyle={{ // style object for drawer
				backgroundColor: '#eee',
				width: 150
			}}

			drawerContent={() => {

				return(
					<ScrollView contentContainerStyle={{
						flex:1,
						alignItems:'center',
						justifyContent: 'space-between', 
					}}>
						{['BlogPost', 'Image', 'Video', 'BulkUploadTabs'].map((option) => {

							let screen_name = option
							option = option.toLowerCase()
							option = option.charAt(0).toUpperCase() + option.slice(1);

							if (screen_name === 'BulkUploadTabs'){
								option = 'Bulk Upload'
							}

							return (
								<TouchableOpacity activeOpacity={0.2} onPress={ () => navigation.navigate(screen_name) } style={{marginTop:50, marginBottom:50,}}>
									<Text style={{color:'blue', fontWeight:'bold', fontSize:20}}>
										{option}
									</Text>
								</TouchableOpacity>
							)
						})}
					</ScrollView>
				)
			}}			
		>

			<Drawer.Screen name="Image" component={ ConnectedImageScreen }
				options={{ 
					headerShown:true,
					title: 'Images',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<Drawer.Screen name="BlogPost" component={ ConnectedBlogPostScreen }
				options={{ 
					headerShown:true,
					title: 'Blogposts',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<Drawer.Screen name="Video" component={ ConnectedVideoScreen }
				options={{ 
					headerShown:true,
					title: 'Videos',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

			<Drawer.Screen name="BulkUploadTabs" component={ BottomTabs }
				options={{ 
					headerShown:false,
				}}
			/>

		</Drawer.Navigator>
	);
}







const Stack = createStackNavigator();

function SignInStack({navigation}) {
	return (
		<Stack.Navigator headerMode='none'>

			<Stack.Screen name="Login" component={ ConnectedLoginScreen }
				options={{ 
					headerShown:true,
					title: 'Login',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
				}}
			/>

			<Stack.Screen name="SignUp" component={ ConnectedSignUpScreen }
				options={{ 
					headerShown:true,
					title: 'SignUp',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
				}}
			/>

		</Stack.Navigator>
	);
}


function InnerStack({navigation}) {
	return (
		<Stack.Navigator
			// headerMode='none'
		>		

			<Stack.Screen name="Content_Drawer" component={ContentShowingDrawer}
				options={{ 
					headerShown:false,
				}}
			/>

			<Stack.Screen name="Individual_BlogPost" component={ConnectedIndividualBlogPost}
				options={{ 
					headerShown:true,
					title: 'Individual BlogPost',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>
		
			<Stack.Screen name="Individual_Video" component={ConnectedIndividualVideo}
				options={{ 
					headerShown:false,
					title: 'Individual Video',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>
		
			<Stack.Screen name="Individual_Image" component={ConnectedIndividualImage}
				options={{ 
					headerShown:true,
					title: 'Individual Image',
					headerTitleAlign: 'center',
					headerBackTitleVisible: false,
					headerLeft: () => (	<TouchableOpacity activeOpacity={0.2} onPress={() => this.props.navigation.goBack()} style={{
						marginTop:50,
						marginBottom:50,
					}}>
						<Text>
							Go Back
						</Text>
					</TouchableOpacity>	),
					headerRight: () => (<Image source={require('./images/samosa.jpg')} style={{resizeMode: "center", height: 40, width: 40,paddingLeft: 50,}}/>),
				}}
			/>

		{/* added so that user could be pushed to login if token expired or unauthorized in backend*/}
			<Stack.Screen name="SignInStack" component={SignInStack}
				options={{ 
					headerShown:false,
				}}
			/>

		</Stack.Navigator>
	);
}






const RootStack = createStackNavigator();

class AppNavigation extends Component {
	constructor(props) {
			super(props);
	}

	render() {
		return (
			<NavigationContainer>
				<RootStack.Navigator headerMode='none'>
					{this.props.isSignedIn === false || this.props.phone_number === null 
						? 
							( <RootStack.Screen name="SignInStack" component={SignInStack}/> )
						: 
							( <RootStack.Screen name="InnerStack" component={InnerStack} /> )
					}		
				</RootStack.Navigator>
			</NavigationContainer>
		);
	}
}



export default AppNavigation;