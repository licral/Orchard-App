import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Text,
    View,
    StyleSheet
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <View style={{alignItems: 'center'}}>
                <Item name='Apples' />
                <Item name='Bananas' />
                <Item name='Oranges' />
            </View>
        );
    }
}

class Item extends Component {
    render() {
        return (
            <Text style={styles.bold}>Item: {this.props.name}</Text>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);