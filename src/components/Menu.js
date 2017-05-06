import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    View,
    Text,
    FlatList,
    ScrollView
} from 'react-native';

var menu = class Menu extends Component {
    render() {
        return (
            <View style={styles.menuContainer}>
                <View style={styles.menuHeader}>
                    <Text>User: Placeholder</Text>
                    <Text>Current Property: Placeholder</Text>
                </View>
                <View style={styles.menuContent}>
                    <FlatList
                        data={[
                            {key: 'Option one: Probably "View History"'},
                            {key: 'Option two: Probably "Change Properties"'}
                        ]}
                        renderItem={({item}) =>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>{item.key}</Text>
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }
}

export default menu;