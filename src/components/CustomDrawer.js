import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    Button,
    Image
} from 'react-native';

var STORAGE_KEY = 'id-token';

const customDrawer = class CustomDrawer extends Component{
    constructor(){
        super();
        this.state = {
            user: ""
        };
    }

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
                 .then(async (response) => {
                     if(response.ok){
                          await AsyncStorage.removeItem(STORAGE_KEY);
                     } else {
                         console.log("Not ok");
                     }
                 })
                 .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    async _getName(){
        try{
            var username = await AsyncStorage.getItem('username');
            this.setState({user: username});
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        if(this.state.user === ""){
            this._getName();
        }
        return (
            <View style={{flex: 1}}>
                <View>
                    <View style={styles.drawerBanner}>
                        <Image style={styles.margin} source={require('../img/side_logo.jpg')} />
                        <View style={styles.margin}>
                            <Text style={styles.sideHeading}>You are logged in as {this.state.user}</Text>
                        </View>
                    </View>
                    <DrawerItems {...this.props.items} />
                </View>
                <View style={{flex: 1}} />
                <View>
                    <Button
                       onPress={() => {this._logout()}}
                       title="Logout"
                       color="#fe4a49"
                       />
                </View>
            </View>
        );
    }
}

export default customDrawer;