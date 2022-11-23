import React, {useState} from "react";
import {View, TextInput, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../Assets/Colors/Colors'

import firebase from "firebase/compat/app";
import "firebase/compat/storage"
require("firebase/firestore")
require("firebase/compat/storage")

export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
            console.log("ERROR!!!", console.error())
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return(
        <View style={styles.container}>
            <Image source={{uri: props.route.params.image}}/>
            
            <TextInput 
                style={styles.textInput}
                placeholder="Describe your day!"
                placeholderTextColor={'#000000'}
                onChangeText={(caption) => setCaption(caption)}
            />
            {<TouchableOpacity
                onPress={() => uploadImage()}
                style = {styles.button}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>}
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textInput: {
        backgroundColor: '#E7E7E7',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 10
    },  
    button: {
        backgroundColor: colors.buttons,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        marginHorizontal: 40,
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        padding: 5,
        color: '#FFF',
        alignSelf: 'center'
    },
    saveButton: {
        color: colors.landingBackground
    }
})