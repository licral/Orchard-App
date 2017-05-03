import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class OrchardApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);