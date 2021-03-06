import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';
import {
    MenuContext
} from 'react-native-popup-menu';
import CustomDrawer from './CustomDrawer.js';
import DrawerButton from './DrawerButton.js';
import SearchButton from './SearchButton.js';
import OptionsButton from './OptionsButton.js';
import BackButton from './BackButton.js';
import SearchBar from './SearchBar.js';
import ActivityListView from '../views/ActivityListView.js';
import BarcodeView from '../views/BarcodeView.js';
import RegisterView from '../views/RegisterView.js';
import RecordView from '../views/RecordView.js';
import RegisteredPlantView from '../views/RegisteredPlantView.js';
import ActivityView from '../views/ActivityView.js';
import MapView from '../views/MapView.js';
import AllPlantsView from '../views/AllPlantsView.js';
import PlantInfoView from '../views/PlantInfoView.js';
import styles from '../styles/style.js';

const activityHistoryStack = StackNavigator({
    Calendar: {
        screen: ActivityListView,
        navigationOptions: ({navigation}) => ({
            headerTitle: navigation.state.params && navigation.state.params.search ? <SearchBar navigation={navigation} /> : "Activity History",
            headerLeft: navigation.state.params && navigation.state.params.search ? <BackButton navigation={navigation} /> : <DrawerButton navigation={navigation} />,
            headerRight: navigation.state.params && navigation.state.params.search ? <OptionsButton navigation={navigation} /> : <SearchButton navigation={navigation} />
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

const mapStack = StackNavigator({
    MapPlants: {
        screen: MapView,
        navigationOptions: ({navigation}) => ({
            headerTitle: "Map of Plants",
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
            title: "Activity History",
            drawerIcon: ({tintColor}) => (
                <Icon name="description" style={[styles.drawerIcon, {color: tintColor}]} />
            )
        })
    },
    AllPlants: {
        screen: allPlantsStack,
        navigationOptions: () => ({
            title: "View All Plants",
            drawerIcon: ({tintColor}) => (
                <Icon name="local-florist" style={[styles.drawerIcon, {color: tintColor}]} />
            )
        })
    },
    MapPlants: {
        screen: mapStack,
        navigationOptions: () => ({
            title: "Map of All Plants",
            drawerIcon: ({tintColor}) => (
                <Icon name="location-on" style={[styles.drawerIcon, {color: tintColor}]} />
            )
        })
    }
}, {
    contentComponent: props => <CustomDrawer items={props} />,
    contentOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: '#72bb53',
        inactiveTintColor: '#43a047'
    }
});

const mainView = class MainView extends Component{
    render(){
        return (
            <MenuContext>
                <OuterNavigator />
            </MenuContext>
        );
    }
}

export default mainView;
