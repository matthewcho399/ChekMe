import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import ProfileImage from '../../Assets/Images/ProfilePlaceHolder.png'

export default function SingleUser(props) {
    return (
        <TouchableOpacity style={styles.content} onPress={props.onPressCallback}>
            <View style={styles.imageContainer}>
                <View style={{aspectRatio:1}}>
                    <Image source={{ uri: props.imageSrc }} style={styles.imageStyle} />
                </View>
            </View>

            <View style={styles.textBox}>
                <Text>
                    {props.username}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({


    // Screen content portion.
    content: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 6,
        borderBottomWidth: 1,
        flexDirection: 'row'
    },

    // Image container styling.
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        overflow: 'hidden',
    },

    // Image style, settings for image.
    imageStyle: {
        aspectRatio: 1,
        borderRadius: 100,
        height: '80%',
        width: '80%',
        flex: 1,
        resizeMode: 'contain',
    },

    // Text container styling
    textBox: {
        padding: 10,
        justifyContent: 'center',
        height: '100%',
        flex: 7,
    },
});