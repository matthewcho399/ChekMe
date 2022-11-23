import React, { Component } from "react";
import {
  View,
  Button,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../../Assets/Colors/Colors";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <SafeAreaView>
              <Image
                source={require("../../Assets/Images/chekme-logo.png")}
                style={styles.logo}
              />
            </SafeAreaView>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Register</Text>
              <TextInput
                style={styles.textInput}
                placeholder="name"
                onChangeText={(name) => this.setState({ name })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="email"
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
              <Button
                style={styles.button}
                onPress={() => this.onSignUp()}
                title="Sign Up"
                color="#FFFFFF"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.landingBackground,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-evenly",
  },
  logo: {
    marginTop: 80,
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  subContainer: {
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 50,
    fontFamily: "Inter-Bold",
    fontSize: 33,
    color: colors.whiteText,
    marginBottom: 15,
  },
  textInput: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    fontFamily: "Inter-Medium",
  },
});

export default Register;
