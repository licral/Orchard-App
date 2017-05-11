import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import DrawerButton from './components/DrawerButton.js';

import CalendarView from './views/CalendarView.js';
import BarcodeView from './views/BarcodeView.js';
import styles from './styles/style.js';

import {
    AppRegistry
} from 'react-native';

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

const OrchardApp = DrawerNavigator({
   Home: {
        screen: InnerNavigator,
        navigationOptions: () => ({
            title: "View History"
        })
   },
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);