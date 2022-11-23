import React from 'react';
import { FlatList, Pressable, View, TouchableOpacity, Image, RefreshControl, Modal, Alert, StyleSheet, Button, Text } from 'react-native';
import { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';

// Import Components
import SinglePost from '../Components/HomePage/SinglePost'
import UserData from '../Data/UserMockData'
import FilterFriends from '../Components/HomePage/FilterDropDown'
import ProfilePage from './ProfilePage'

// Import assets
import createPostIcon from '../Assets/Images/createPost.png'

const Stack = createStackNavigator();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function HomeScreen({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    // refreshing tool
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(800).then(() => setRefreshing(false));
        navigation.navigate("home")
    }, []);

    // true close friends posts, false all friends posts
    const [postType, setPostType] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    function closeCreatePost() {
        setModalVisible(false)
    }

    function discardChanges() {
        Alert.alert(
            "Are you sure?",
            "Discard changes",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => setModalVisible(false) }
            ])
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed")
                    setModalVisible()
                }}
            >
                <Pressable style={styles.modalBackground} onPress={discardChanges} />
                <View style={styles.modalStyle} >
                    <Button title='Content' onPress={closeCreatePost} />
                </View>
            </Modal>

            < View style={styles.content} >
                <View style={styles.notch}>
                    <View style={styles.flexSpacerSmall} />

                    <View style={styles.filter}>
                        <FilterFriends closeFriends={() => setPostType(true)}
                            everyone={() => setPostType(true)} />
                    </View>

                    <View style={styles.flexSpacer} />

                    <View style={styles.createPost}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={styles.createPostContainer}>
                                <Image source={createPostIcon} style={styles.imageStyle} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.posts}>
                    <FlatList
                        keyExtractor={(item) => (item.postId)}
                        data={UserData.Users}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item }) => (
                            <SinglePost
                                username={item.name}
                                timeframe={item.timeframe}
                                messageType={item.messageType}
                                firstImageSrc={item.image1}
                                secondImageSrc={item.image2}
                                sliderValue={item.sliderPosition}
                            />
                        )}
                    />
                </View>
            </View >
        </>
    )
}

export default function HomePage() {
    const Content = (
        <Stack.Navigator screenOptions={({ route }) => ({
            presentation: 'card',
            headerShown: false,
        })}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="profile" component={ProfilePage} />
        </Stack.Navigator>
    )

    return (
        Content
    )
}

const styles = StyleSheet.create({
    
    // Overall content container styling
    modalStyle: {
        position: 'absolute',
        top: '42.5%',
        right: '15%',
        bottom: '42.5%',
        left: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 25,
        flexDirection: 'column',
        backgroundColor: 'white'
    },

    modalBackground: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: .3,
    },

    // Screen content portion 
    createPostContainer: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
    },

    // Image style, settings for image.
    imageStyle: {
        height: '100%',
        width: '100%',
        marginBottom: 1,
        flex: 1,
        resizeMode: 'contain',
    },

    // Screen content portion 
    content: {
        width: '100%',
        borderWidth: 1,
        flex: 90,
        backgroundColor: '#DFE6FC',
    },

    notch: {
        flexDirection: 'row',
        height: '5%',
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'grey',
        borderBottomColor: 'grey'
    },

    posts: {
        height: '95%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    createPost: {
        flex: 2,
    },

    filter: {
        flex: 4,
    },

    flexSpacer: {
        flex: 5
    },

    flexSpacerSmall: {
        flex: 1
    }
});