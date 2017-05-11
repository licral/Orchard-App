import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
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

class CameraView extends Component{
    render () {
        return (
            <View style={styles.pageContent}>
                <Text>This is a camera input page</Text>
            </View>
        );
    }
}

var barcodeView = TabNavigator({
    Manual: {
        screen: ManualView
    },
    Camera: {
        screen: CameraView
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