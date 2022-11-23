import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function PostSlider(props) {
    const [value, setValue] = useState(0);

    return (
        <Slider
            style={styles.sliderStyle}
            minimumValue={0}
            maximumValue={10}
            value={props.sliderValue}
            step={1}
            disabled={true}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
        />
    );
};

const styles = StyleSheet.create({
    sliderStyle: {
        height: '100%',
        width: '100%',
    }
});
