import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraView from './CameraView.js';
import ManualView from './ManualView.js';
import styles from '../styles/style.js';
import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

var barcodeView = TabNavigator({
    Camera: {
        screen: CameraView
    },
    Manual: {
        screen: ManualView
    }
}, {
    tabBarOptions: {
        style: styles.tabBar,
        indicatorStyle: styles.tabIndicator,
        activeTintColor: 'white',
        inactiveTintColor: '#4d4d4d'
    },
    backBehavior: "none"
});

export default barcodeView;