import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraView from './CameraView.js';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

class ManualView extends Component{
    render () {
        return (
            <View style={styles.pageContent}>
                <Text>This is a manual input page</Text>
            </View>
        );
    }
}

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