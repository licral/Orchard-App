import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';

const customDrawer = class CustomDrawer extends Component{

    async _logout(){
        try{
             var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
             fetch('https://orchard-app-java-tomcat.herokuapp.com/logout', {
                     method: "POST",
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                     },
                     body: 'token=' + encodeURIComponent(TOKEN)
                 })
                 .then((response) => {
                     if(response.ok){
                          AsyncStorage.removeItem(STORAGE_KEY);
                     } else {
                         console.log("Not ok");
                     }
                 })
                 .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <DrawerItems {...this.props.items} />
                <View style={{flex: 1}} />
                <Button onPress={() => {this._logout()}} title="Logout" />
            </View>
        );
    }
}

export default customDrawer;