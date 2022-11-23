//React Imports
import React, { Component } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//Screen Imports
//import Homepage from './Views/HomePage'
//import ProfilePage from './Views/ProfilePage'
//import AddUserPage from './Views/AddUserPage'
import LandingScreen from './Components/Auth/Landing'
import RegisterScreen from './Components/Auth/Register'
import LoginScreen from './Components/Auth/Login'
import MainScreen from './Components/Main'
import AddScreen from './Components/Main/Add'
import SaveScreen from './Components/Main/Save'
import RealMainScreen from './Components/RealMain'

//Firebase
import firebase from 'firebase/compat/app'
import { getStorage } from '@firebase/storage';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDSTYgL6oen5UhedqLYuUtcSGpAZvB_bAY",
  authDomain: "chekme-90077.firebaseapp.com",
  projectId: "chekme-90077",
  storageBucket: "chekme-90077.appspot.com",
  messagingSenderId: "946502945215",
  appId: "1:946502945215:web:0285eb7a83f90bf4a0390a",
  measurementId: "G-DELHZC2C0W",
  storageBucket: "gs://chekme-90077.appspot.com"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const storage = getStorage(App);

//Redux
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './redux/reducers'
const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false
  }) 
})

//Styles
import colors from './Assets/Colors/Colors'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) { //if user is not logged in
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true, 
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <StatusBar
            barStyle='default'
            hidden='false' />
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/> 
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/> 
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar
            barStyle='default'
            hidden='false' />
           <Stack.Navigator initialRouteName='Main'>
            {<Stack.Screen name = "Main" component={MainScreen} options={{ headerShown: false }} />}
            {<Stack.Screen name = "Add" component={AddScreen} navigation={this.props.navigation} 
            options={{
              title: 'ChekMe',
              headerStyle: {
                  backgroundColor: colors.landingBackground,
                  height: 80
              },
              headerTitleStyle: {
                  fontFamily: 'Jaldi-Regular',
                  color: colors.whiteText,
                  fontSize: 25
              },
              headerBackTitleVisible: false,
              headerLeft: () => null
            }} />}
            {<Stack.Screen name = "Save" component={SaveScreen} navigation={this.props.navigation} 
            options={{
              title: 'ChekMe',
              headerStyle: {
                  backgroundColor: colors.landingBackground,
                  height: 80
              },
              headerTitleStyle: {
                  fontFamily: 'Jaldi-Regular',
                  color: colors.whiteText,
                  fontSize: 25
              },
              headerLeft: () => null
            }} /> }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}
