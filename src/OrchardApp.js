import React, { Component } from 'react';
import styles from './styles/style.js';
import Banner from './components/Banner.js';

import ToolbarAndroid from 'ToolbarAndroid';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
    AppRegistry,
    Image,
    Text,
    View,
    Button
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <Banner styleToolbar={styles.toolbar} styleMenu={styles.menu} />
        );
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);