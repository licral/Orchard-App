import React, { Component } from 'react';
import ToolbarAndroid from 'ToolbarAndroid';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import Drawer from 'react-native-drawer';
import Menu from './Menu.js';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var banner = class Banner extends Component {
    render() {
        var navigationView = <Menu />;
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
                <View>
                    <Text>This is going to be the agenda view of the history activities</Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

export default banner;