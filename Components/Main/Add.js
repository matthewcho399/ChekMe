import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Button, Image, StyleSheet, Touchable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from "@react-navigation/native";

export default function Add({navigation}) {
    const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/*<Button title="Pick an image from camera roll" onPress={pickImage} />*/}
      {/*<Button title="Next" onPress={() => navigation.navigate('Save', {image})} />*/}
      <TouchableOpacity
        style={styles.buttons}
        onPress={pickImage}>
          <Text style={styles.buttonText}> Pick an image from camera roll </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Save', {image})}>
          <Text style={styles.buttonText}> Next </Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    borderRadius: 5, 
    backgroundColor: '#E7E7E7',
    marginBottom: 10
  },
  buttonText: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    padding: 10,
    color: '#000000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200/2
  }
})