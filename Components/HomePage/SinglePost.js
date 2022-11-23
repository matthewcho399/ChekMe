import { Text, View, StyleSheet, Image } from "react-native"
import ProfileImage from '../../Assets/Images/ProfilePlaceHolder.png'
import PostSlider from './PostSlider'

export default function SinglePost(props) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftImageContainer}>
                    <Image source={{ uri: props.firstImageSrc }} style={styles.imageStyle} />
                </View>

                <View style={styles.postContent}>
                    <View style={styles.textBox}>
                        <Text style={styles.textStyle}>
                            {props.username}
                        </Text>
                    </View>

                    <View style={styles.postBox}>
                        <PostSlider sliderValue={props.sliderValue}/>
                    </View>
                </View>

                <View style={styles.rightImageContainer}>
                    <Image source={{ uri: props.secondImageSrc }} style={styles.imageStyle} />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    // Overall container portion.
    container: {
        alignItems: 'center'
    },

    // Screen content portion.
    content: {
        width: '97%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 8,
        marginTop: 8,
        aspectRatio: 5,
        borderWidth: 1,
        flexDirection: 'row'
    },

    // Image container styling.
    leftImageContainer: {
        marginLeft: 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        overflow: 'hidden',
    },
    
    // Image container styling.
    rightImageContainer: {
        marginRight: 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        overflow: 'hidden',
    },
    
    // Image style, settings for image.
    imageStyle: {
        width: '80%',
        flex: 1,
        resizeMode: 'contain',
    },

    postContent: {
        flexDirection: "column",
        flex: 7
    },

    // Text container styling
    textBox: {
        justifyContent: 'flex-end',
        height: '100%',
        flex: 3,
    },

    // Text styling 
    textStyle: {
        textAlign: 'left'
    },

    // Slider container styling 
    postBox: {
        flex: 6,
        justifyContent: 'center'
    },
});