import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

var menu = class Menu extends Component {
    render() {
        return (
            <View style={this.props.styleMenu}>
                <Text>Hello World!</Text>
            </View>
        );
    }
}

export default menu;