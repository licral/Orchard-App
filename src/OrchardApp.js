import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import DrawerButton from './components/DrawerButton.js';
import CalendarView from './views/calendarView.js';
import styles from './styles/style.js';
import {
    AppRegistry
} from 'react-native';

const InnerNavigator = StackNavigator({
    Calendar: {screen: CalendarView},
}, {
    navigationOptions: ({navigation}) => ({
        title: 'Date Placeholder',
        headerLeft: <DrawerButton navigation={navigation} />,
        headerStyle: styles.toolbar,
        headerTintColor: 'white'
    })
});

const OrchardApp = DrawerNavigator({
   Home: {
       screen: InnerNavigator,
   },
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);