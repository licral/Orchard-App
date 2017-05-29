import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import CustomDrawer from './CustomDrawer.js';
import DrawerButton from './DrawerButton.js';
import CalendarView from '../views/CalendarView.js';
import BarcodeView from '../views/BarcodeView.js';
import RegisterView from '../views/RegisterView.js';
import RecordView from '../views/RecordView.js';
import RegisteredPlantView from '../views/RegisteredPlantView.js';
import styles from '../styles/style.js';

const InnerNavigator = StackNavigator({
    Calendar: {
        screen: CalendarView,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Activity History",
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
    Barcode: {
        screen: BarcodeView,
        navigationOptions: () => ({
            headerTitle: "Enter Barcode"
        })
    },
    Register: {
        screen: RegisterView,
        navigationOptions: () => ({
            headerTitle: "Register Plant Details"
        })
    },
    Record: {
        screen: RegisteredPlantView,
        navigationOptions: () => ({
            headerTitle: "Record Activity Details"
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
            title: "Activity History"
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