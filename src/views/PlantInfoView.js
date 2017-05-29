import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var plantInfoView = class PlantInfoView extends Component{

    render () {
        return (
            <View style={styles.pageContent}>
                <Text>Plant info</Text>
            </View>
        );
    }
}

export default plantInfoView;