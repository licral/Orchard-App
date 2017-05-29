import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraView from './CameraView.js';
import ManualView from './ManualView.js';
import styles from '../styles/style.js';
import {
    AsyncStorage,
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
        activeTintColor: '#4d4d4d',
        inactiveTintColor: '#8c8c8c'
    }
});

export default barcodeView;