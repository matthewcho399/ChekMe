import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { useFonts } from "expo-font";
import colors from "../../Assets/Colors/Colors";
import firebase from "firebase/compat/app";
require("firebase/firestore");

function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [loaded] = useFonts({
    "Inter-Medium": require("../../Assets/Fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../../Assets/Fonts/Inter-Bold.ttf"),
    "Jaldi-Regular": require("../../Assets/Fonts/Jaldi-Regular.ttf"),
    "Inter-Regular": require("../../Assets/Fonts/Inter-Regular.ttf")
  });

  useEffect(() => {
    let posts = [];

    if (props.usersLoaded === props.friends.length) {
      for (let i = 0; i < props.friends.length; i++) {
        const user = props.users.find((el) => el.uid === props.friends[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }

      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });

      setPosts(posts);
    }
  }, [props.usersLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden="false" />
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.userNameText}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              <Text style={styles.captionText}>{item.caption}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
    marginTop: 20,
  },
  containerImage: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  userNameText: {
    fontSize: 17,
    fontFamily: "Inter-Medium",
    padding: 5,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  captionText: {
    fontSize: 17,
    fontFamily: "Inter-Regular",
    padding: 5,
    marginHorizontal: 12,
    marginVertical: 5
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  friends: store.userState.friends,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);