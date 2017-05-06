import React, { Component } from 'react';
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
            <Banner />
        );
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);