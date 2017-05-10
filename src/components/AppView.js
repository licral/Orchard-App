import React, { Component } from 'react';
import ToolbarAndroid from 'ToolbarAndroid';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu.js';
import CalendarView from '../views/calendarView.js';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var appView = class AppView extends Component {
    render() {
        var navigationView = <SideMenu />;
        return(
            <DrawerLayoutAndroid
                ref={(ref) => this._drawer = ref}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
                >
                <ToolbarAndroid
                    navIcon = {require('../img/menuIcon.png')}
                    onIconClicked = {() => {this._drawer.openDrawer()}}
                    title = "Date Placeholder"
                    style = {styles.toolbar}
                    titleColor = 'white'
                />
                <CalendarView />
            </DrawerLayoutAndroid>
        );
    }
}

export default appView;