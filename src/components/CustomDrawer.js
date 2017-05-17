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
            await AsyncStorage.removeItem(STORAGE_KEY);
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