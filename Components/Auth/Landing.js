import React from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import colors from "../../Assets/Colors/Colors";

export default function Landing({ navigation }) {
  const [loaded] = useFonts({
    "Inter-Medium": require("../../Assets/Fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../../Assets/Fonts/Inter-Bold.ttf"),
    "Jaldi-Regular": require("../../Assets/Fonts/Jaldi-Regular.ttf"),
    "Inter-Regular": require("../../Assets/Fonts/Inter-Regular.ttf")
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={require("../../Assets/Images/chekme-logo.png")}
          style={styles.logo}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.landingBackground,
    alignItems: "center",
  },
  logo: {
    marginTop: 125,
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 30,
  },
  text: {
    color: colors.blackText,
    fontFamily: "Inter-Medium",
    fontSize: 20,
  },
  buttons: {
    paddingTop: 100,
    marginTop: 30,
  },
});
