import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';

class OrchardApp extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Banner />
                <View style={styles.page} />
            </View>
        );
    }
}

class Banner extends Component {
    render() {
        return(
            <View style={styles.banner} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    banner: {
        height: 65,
        backgroundColor: '#009900'
    },
    page: {
        backgroundColor: 'white'
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);