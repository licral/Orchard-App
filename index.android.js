import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

class OrchardApp extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <Image source={pic} style={{width: 193, height: 110}}/>
        );
    }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);