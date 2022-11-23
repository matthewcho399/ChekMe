import React, { Component } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import colors from '../Assets/Colors/Colors'
import firebase from 'firebase/compat/app'

//Screen Imports
import FeedScreen from './Main/Feed' 
import UploadScreen from './Main/Add'
import ProfileScreen from './Main/Profile'
import SearchScreen from './Main/Search'

//functions
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFriends, clearData } from '../redux/actions/index' 
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFriends(); 
    }
    
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                        title: 'ChekMe',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name='home-outline' size={30} />
                        ),
                        headerStyle: {
                            backgroundColor: colors.landingBackground,
                            height: 80
                        },
                        headerTitleStyle: {
                            fontFamily: 'Jaldi-Regular',
                            color: colors.whiteText,
                            fontSize: 25,
                        }
                    }}/>
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                    options={{
                        title: 'ChekMe',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search-outline" size={30} />
                        ),
                        headerStyle: {
                            backgroundColor: colors.landingBackground,
                            height: 80
                        },
                        headerTitleStyle: {
                            fontFamily: 'Jaldi-Regular',
                            color: colors.whiteText,
                            fontSize: 25
                        },
                    }}/>
                <Tab.Screen name="Upload" component={UploadScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        title: 'ChekMe',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="upload" size={30} />
                        ),
                        headerStyle: {
                            backgroundColor: colors.landingBackground,
                            height: 80
                        },
                        headerTitleStyle: {
                            fontFamily: 'Jaldi-Regular',
                            color: colors.whiteText,
                            fontSize: 25
                        }
                    }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                    options={{
                        title: 'ChekMe',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-circle-outline" size={30} />
                        ),
                        headerStyle: {
                            backgroundColor: colors.landingBackground,
                            height: 80
                        },
                        headerTitleStyle: {
                            fontFamily: 'Jaldi-Regular',
                            color: colors.whiteText,
                            fontSize: 25
                        }
                    }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({ 
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFriends, clearData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);