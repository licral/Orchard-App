import React, { Component } from 'react';
import MainView from './components/MainView.js';
import LoginView from './views/LoginView.js';
import styles from './styles/style.js';

import {
    AsyncStorage,
    AppRegistry,
    View,
    ActivityIndicator
} from 'react-native';

var STORAGE_KEY = 'id-token';

class OrchardApp extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: null
        };
    }

    async _confirmLoggedIn(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            if(TOKEN == null){
                this.setState({loggedIn: false});
            } else {
                this.setState({loggedIn: true});
            }
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render(){
        this._confirmLoggedIn();

        if(this.state.loggedIn == null){
            return(
                <View style={styles.pageContent}>
                    <ActivityIndicator
                        animating={true}
                        style={{height: 80}}
                        size="large"
                      />
                </View>
            );
        } else if(this.state.loggedIn) {
            return(
                <MainView />
            );
        } else {
            return(
                <LoginView />
            );
        }
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);