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
            <View style={styles.container}>
                <View style={styles.banner} />
                <View style={styles.page} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    banner: {
        height: 50,
        backgroundColor: '#009900'
    },
    page: {
        backgroundColor: 'white'
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);