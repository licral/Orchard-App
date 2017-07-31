import React, { Component } from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import CustomDrawer from './CustomDrawer.js';
import DrawerButton from './DrawerButton.js';
import CalendarView from '../views/CalendarView.js';
import BarcodeView from '../views/BarcodeView.js';
import RegisterView from '../views/RegisterView.js';
import RecordView from '../views/RecordView.js';
import RegisteredPlantView from '../views/RegisteredPlantView.js';
import ActivityView from '../views/ActivityView.js';
import AllPlantsView from '../views/AllPlantsView.js';
import PlantInfoView from '../views/PlantInfoView.js';
import styles from '../styles/style.js';

const activityHistoryStack = StackNavigator({
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
            headerTitle: "Enter Plant ID"
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
    },
    Activity: {
        screen: ActivityView,
        navigationOptions: () => ({
            headerTitle: "Activity Details"
        })
    }
}, {
    navigationOptions: () => ({
        headerStyle: styles.toolbar,
        headerTintColor: 'white'
    })
});

const allPlantsStack = StackNavigator({
    ListPlants: {
        screen: AllPlantsView,
        navigationOptions: ({navigation}) => ({
            headerTitle: "View All Plants",
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
    PlantView: {
        screen: PlantInfoView,
        navigationOptions: () => ({
            headerTitle: "Plant Information",
        })
    },
    Activity: {
        screen: ActivityView,
        navigationOptions: () => ({
            headerTitle: "Activity Details",
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
        screen: activityHistoryStack,
        navigationOptions: () => ({
            title: "Activity History"
        })
    },
    AllPlants: {
        screen: allPlantsStack,
        navigationOptions: () => ({
            title: "View All Plants"
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