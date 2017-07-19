import React, { Component } from 'react';
import MainView from './components/MainView.js';
import LoginView from './views/LoginView.js';
import styles from './styles/style.js';
import {
    AsyncStorage,
    AppRegistry,
    View,
    ActivityIndicator,
    StatusBar,
    NetInfo,
    Text
} from 'react-native';

var STORAGE_KEY = 'id-token';

class OrchardApp extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: null,
            internet: null
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

    componentDidMount(){
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleFirstConnectivityChange.bind(this)
        );

        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({internet: isConnected});
        });
    }

    _handleFirstConnectivityChange(isConnected) {
        this.setState({internet: isConnected});
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleFirstConnectivityChange
        );
    }

    render(){
        if(this.state.internet == null){
            return(
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <ActivityIndicator
                        animating={true}
                        style={{height: 80}}
                        size="large"
                      />
                </View>
            );
        } else if(this.state.internet){
            this._confirmLoggedIn();
            if(this.state.loggedIn == null){
                // Rendering loading screen
                return(
                    <View style={styles.pageContent}>
                        <StatusBar
                            backgroundColor="#43a047"
                            barStyle="light-content"
                            />
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
        } else {
            return(
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <Text>Your device is offline. Please connect to the internet before proceeding.</Text>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);