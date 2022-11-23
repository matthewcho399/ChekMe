import React, { Component } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app'

//Screen Imports
import HomePage from '../Views/HomePage' 
import AddUserPage from '../Views/AddUserPage'
import ProfilePage from '../Views/ProfilePage'
 
//functions
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFriends, clearData } from '../redux/actions/index' 

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
            <Tab.Navigator initialRouteName='Home'>
                <Tab.Screen name="Home" component={HomePage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}/>
                <Tab.Screen name="AddUser" component={AddUserPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26} />
                    ),
                }}/>
                <Tab.Screen name="Profile" component={ProfilePage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
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