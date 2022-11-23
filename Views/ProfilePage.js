// Import Libraries 
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Button, FlatList } from "react-native"
import {connect} from 'react-redux'
import firebase from 'firebase/compat/app'
require('firebase/firestore')

// Import components 
import SelectImage from '../Components/HomePage/SelectImage'
import { current } from '@reduxjs/toolkit'

function ProfilePage(props) {
    const[userPosts, setUserPosts] = useState([]);
    const[user, setUser] = useState(null);
    const[friends, setFriends] = useState(false);

    useEffect(() => {
        const {currentUser, posts} = props;
        console.log({currentUser, posts});

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("Users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else { //user doesn't exist in the database
                        console.log("does not exist")
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return{id, ...data}
                    })
                    setUserPosts(posts)
                })
        }

        if (props.friends.indexOf(props.route.params.uid) > -1) {
            setFriends(true);
        } 
        else {
            setFriends(false);
        }
    }, [props.route.params.uid, props.friends])

    const onAddFriend = () => {
        firebase.firestore()
        .collection("friends")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFriends")
        .doc(props.route.params.uid)
        .set({})
      }
      const onRemoveFriend = () => {
        firebase.firestore()
        .collection("friends")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFriends")
        .doc(props.route.params.uid)
        .delete()
      }
      const onLogout = () => {
        firebase.auth().signOut();
      }

      if (user === null) {
        return <View/>
      }

    return (
        /*
        <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.container}>
                <SelectImage style={styles.imagePicker} />
            </View>
            <Text>
                Tap to replace profile pic
            </Text>
        </ScrollView>
        */
        <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
  
          {props.route.params.uid !== firebase.auth().currentUser.uid ? ( //check if user is friends
            <View>
              {friends ? (
                <Button
                  title="Friends"
                  onPress={() => onRemoveFriend()} 
                />
              ) : 
              (
                <Button
                  title="Add Friend"
                  onPress={() => onAddFriend()} 
                />
              )}
            </View>
          ) : 
            <Button
              title="Logout"
              onPress={() => onLogout()} 
            />}
        </View>
          
        <View style = {styles.containerGallery}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={userPosts}
            renderItem={({item}) => (
              <View style={styles.containerImage}>
                <Image style={styles.image}
                  source={{uri: item.downloadURL}}
                />
              </View>
            )}
          />
        </View>  
      </View>
    )
}

/*
const styles = StyleSheet.create({
    // Overall container portion 
    container: {
        marginTop: 10,
        marginBottom: 10,
        width: '50%',
        aspectRatio: 1,
        flexDirection: 'column'
    },
    ScrollViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // Attach image styling
    imagePicker: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})
*/
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    containerInfo: {
      margin: 20
    },
    containerGallery: {
      flex: 1
    },
    containerImage: {
      flex: 1/3
    },
    image: {
      flex: 1,
      aspectRatio: 1/1
    }
  })

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    friends: store.userState.friends
})

export default connect(mapStateToProps, null)(ProfilePage);