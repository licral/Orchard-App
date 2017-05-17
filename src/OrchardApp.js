import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import DrawerButton from './components/DrawerButton.js';

import CalendarView from './views/CalendarView.js';
import LoginView from './views/LoginView.js';
import BarcodeView from './views/BarcodeView.js';
import styles from './styles/style.js';

import {
    AsyncStorage,
    AppRegistry,
    View,
    ActivityIndicator
} from 'react-native';

var STORAGE_KEY = 'id-token';

const InnerNavigator = StackNavigator({
    Calendar: {
        screen: CalendarView,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Date Placeholder",
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
    Barcode: {
        screen: BarcodeView,
        navigationOptions: () => ({
            headerTitle: "Enter Barcode"
        })
    }
}, {
    navigationOptions: () => ({
        headerStyle: styles.toolbar,
        headerTintColor: 'white'
    })
});

const OuterNavigator = DrawerNavigator({
    Home: {
        screen: InnerNavigator,
        navigationOptions: () => ({
            title: "View History"
        })
    }
});

class OrchardApp extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: null
        };
    }

    async _confirmLoggedIn(){
        var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
        if(TOKEN == null){
            this.setState({loggedIn: false});
        } else {
            this.setState({loggedIn: true});
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
                <OuterNavigator />
            );
        } else {
            return(
                <LoginView storageKey={STORAGE_KEY} />
            );
        }
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);