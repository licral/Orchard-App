import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        super();
        this.state = {info : "Hello"};
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch("https://orchard-app-java-tomcat.herokuapp.com/test")
            .then((response) => response.text())
            .then((responseData) => {
                this.setState({
                    info : responseData
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    test(){

    }

    render() {
        if(this.state.info != "Hello"){
            return (
                <View style={styles.page}>
                    <Text>{this.state.info}</Text>
                    <Icon.Button name="facebook" backgroundColor="#3b5995" onPress={this.test} />
                </View>
            );
        }

        return (
            <View style={styles.page}>
                <Text>Still Waiting!</Text>
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