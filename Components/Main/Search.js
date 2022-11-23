import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from '../../Assets/Colors/Colors'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
require("firebase/firestore");

export default function Search(props) {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = (search) => {
    firebase.firestore()
    .collection('Users')
    .where('name', '>=', search)
    .get()
    .then((snapshot) => {
        let users = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data}
        });
        setUsers(users);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name='search-outline' size={20} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={'#000000'}
          onChangeText={(search)=> fetchUsers(search)}/>
      </View>
      
      <FlatList 
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
            <TouchableOpacity
             onPress={() => props.navigation.navigate("Profile", {uid: item.id})}
             style={styles.profiles}>
                <Text style={styles.nameText}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 10
  },
  searchBar: {
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    width: 350,
    height: 40,
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    padding: 10,
    marginLeft: 5
  },
  profiles:{
    backgroundColor: '#E7E7E7',
    margin: 10,
    borderRadius: 10
  },  
  nameText: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    padding: 10
  }
})