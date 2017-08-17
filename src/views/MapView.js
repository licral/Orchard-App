import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    ActivityIndicator,
    StatusBar,
    StyleSheet
} from 'react-native';

var STORAGE_KEY = 'id-token';

var mapView = class MapView extends Component{
    constructor(){
        super();
        this.state = {
            retrieved: "",
            activityInfo: {}
        }
    }

    render () {
        return (
            <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text>Hello there</Text>
            </View>
        );
    }
}

export default mapView;
