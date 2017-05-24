import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var recordView = class RecordView extends Component{
    constructor(){
        super();
    }
    render () {
        return (
            <View style={styles.pageContent}>
                 <Text>Record View</Text>
            </View>
        );
    }
}

export default recordView;