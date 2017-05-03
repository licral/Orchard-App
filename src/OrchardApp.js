import React, { Component } from 'react';
import {
    AppRegistry,
    Image
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <Text>Hello World</Text>
        )
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);