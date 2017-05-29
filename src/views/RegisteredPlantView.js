import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlantInfoView from './PlantInfoView.js';
import RecordView from './RecordView.js';
import styles from '../styles/style.js';
import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

var registeredPlantView = TabNavigator({
    Record: {
        screen: RecordView
    },
    PlantInfo: {
        screen: PlantInfoView
    }
}, {
    tabBarOptions: {
        style: styles.tabBar,
        indicatorStyle: styles.tabIndicator,
        activeTintColor: '#4d4d4d',
        inactiveTintColor: '#8c8c8c'
    },
    backBehavior: "none"
});

export default registeredPlantView;