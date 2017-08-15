import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';

var FilterView = class FilterView extends Component{
    render () {
        return(
            <View style={styles.pageContent}>
                <ScrollView>
                    <TouchableNativeFeedback
                        onPress={() => {}}>
                        <Text style={[styles.heading, {padding: 10}]}>Activity type</Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {}}>
                        <Text>Species</Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {}}>
                        <Text>Variety</Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {}}>
                        <Text>Date from</Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {}}>
                        <Text>Date to</Text>
                    </TouchableNativeFeedback>
                </ScrollView>
            </View>
        );
    }
}

export default FilterView;
