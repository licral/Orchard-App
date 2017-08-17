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
import MapView from 'react-native-maps';

var STORAGE_KEY = 'id-token';

var mapViewComponent = class MapViewComponent extends Component{

    render () {
        return (
            <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center'}}>
                <MapView
                  style={{...StyleSheet.absoluteFillObject}}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
            </View>
        );
    }
}

export default mapViewComponent;
