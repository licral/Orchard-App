import React, { Component } from 'react';
import ToolbarAndroid from 'ToolbarAndroid';
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
            <Banner />
        );
    }
}

class Banner extends Component {
    render() {
        return(
            <ToolbarAndroid
                navIcon = {require('./img/menuIcon.png')}
                title = "Date Placeholder"
                style = {styles.toolbar}
                titleColor = 'white'
            />
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
    },
    toolbar: {
        height: 56,
        backgroundColor: '#43a047'
    }
});

AppRegistry.registerComponent('OrchardApp', () => OrchardApp);