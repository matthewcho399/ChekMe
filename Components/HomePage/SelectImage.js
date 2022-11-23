// Import Libraries
import React, { useState, useEffect } from 'react'
import { View, Button, Image, TextInput, TouchableOpacity, Text, Modal, Alert, Pressable, ImagePickerIOS } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import EStyleSheet from 'react-native-extended-stylesheet';

// Import Assets
import profilePlaceholder from '../../Assets/Images/icon.png'

export default function SelectImage() {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const exampleImageUri = Image.resolveAssetSource(profilePlaceholder).uri
    const [image, setImage] = useState(exampleImageUri)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')
        })()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
        } else {
            setImageAdded(true)
        }
    }

    if (hasGalleryPermission === false) {
        return (
            <Alert>
                Please allow access to photos
            </Alert>
        )
    }
    return (
        <TouchableOpacity onPress={() => pickImage()} style={{ flex: 1}}>
            {image && <Image source={{ uri: image }} style={{ flex: 1 , borderRadius: 100, }} />}
        </TouchableOpacity>
    )
}

// Styles
const styles = EStyleSheet.create({
    // Image container, contains avaiable room for image.
    imageContainerStyle: {
        marginTop: 30
    },

    // Image style, paperclip for attach an image.
    imageStyle: {
        flex: 1,
        resizeMode: 'contain',
    },
})