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
                <Page />
            </View>
        );
    }
}

class Banner extends Component {
    render() {
        return(
            <View style={styles.banner}>
                <View style={styles.menu_button} />
                <View style={styles.logo} />
                <View style={styles.menu_button} />
            </View>
        );
    }
}

class Page extends Component {
    constructor(){
        this.state = {info : ""};
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch("https://vast-cove-47966.herokuapp.com/get_all_tasks?done=false")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    info : responseData
                });
            })
            .done();
    }

    render() {
        return (
            <View style={styles.page}>
                <Text>this.state.info</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    banner: {
        height: 65,
        backgroundColor: '#009900',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    page: {
        backgroundColor: 'white',
        flex: 1
    },
    menu_button: {
        backgroundColor: '#66ccff',
        height: 50,
        width: 50,
        margin: 7.5
    },
    logo: {
        backgroundColor: '#66ccff',
        height: 50,
        width: 100,
        margin: 7.5
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);