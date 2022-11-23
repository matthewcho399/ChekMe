import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase/compat/app'
require('firebase/firestore')

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts });

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
    } else {
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
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.profileText}>{user.name}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? ( //check if user is friends
          <View>
            {friends ? (
              <TouchableOpacity
              onPress={() => onRemoveFriend()} 
              style={styles.button}
            >
              <Text style={styles.buttonText}>Friends</Text>
              </TouchableOpacity>
            ) : 
            (
              <TouchableOpacity
                onPress={() => onAddFriend()} 
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add Friend</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : 
          <TouchableOpacity
            onPress={() => onLogout()} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>}
      </View>
        
      <View style = {styles.containerGallery}>
        <FlatList
          numColumns={2}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1,
    marginTop: 20
  },
  containerImage: {
    flex: 1/2
  },
  image: {
    flex: 1,
    aspectRatio: 1/1,
    borderRadius: 200 / 2,
    height: 180,
    width: 180,
    padding: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  profileText: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    height: 40,
    padding: 10,
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    alignSelf: 'center'
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  friends: store.userState.friends
})

export default connect(mapStateToProps, null)(Profile);