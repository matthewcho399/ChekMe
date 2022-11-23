import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
    { label: 'Everyone', value: '1' },
    { label: 'Close Friends', value: '2' },

];

const DropdownComponent = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                containerStyle={styles.containerStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Everyone' : 'Select one'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    if(item.value = 1){
                        props.everyone
                        console.log('test')
                    }else {
                        props.closeFriends
                    }
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    dropdown: {        
        flex: 3,
        backgroundColor: '#F8F9FC'
    },
    icon: {
        flex: 1,
    },
    label: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        fontSize: 14,
    },

    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {

    },
    inputSearchStyle: {
        flex: 1,
        fontSize: 16,
    },
});