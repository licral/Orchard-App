import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Text
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <Text>Hello World</Text>
        )
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);