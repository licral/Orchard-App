import React, { Component } from 'react';
import AppView from './components/AppView.js';
import {
    AppRegistry
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <AppView />
        );
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);