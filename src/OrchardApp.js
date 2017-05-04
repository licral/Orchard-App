import React, { Component } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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
    test(){

    }

    render() {
        return(
            <View style={styles.banner}>
                <MaterialIcon.Button name="menu" style={styles.menu_button} size={40} color="#FFFFFF" borderRadius={0} onPress={this.test()} />
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

    render() {
        if(this.state.info != "Hello"){
            return (
                <View style={styles.page}>
                    <Text>{this.state.info}</Text>
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
        height: 70,
        backgroundColor: '#009900',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    page: {
        backgroundColor: 'white',
        flex: 1
    },
    menu_button: {
        margin: 15
    },
    logo: {
        backgroundColor: '#66ccff',
        height: 50,
        width: 100,
        margin: 7.5
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);