import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import CustomDrawer from './CustomDrawer.js';
import DrawerButton from './DrawerButton.js';
import CalendarView from '../views/CalendarView.js';
import BarcodeView from '../views/BarcodeView.js';
import styles from '../styles/style.js';

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
}, {
    contentComponent: props => <CustomDrawer items={props} />
});

const mainView = class MainView extends Component{
    render(){
        return (
            <OuterNavigator />
        );
    }
}

export default mainView;