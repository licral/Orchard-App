import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraView from './CameraView.js';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';

class ManualView extends Component{
    constructor(){
        super();
        this.state = {
            barcode: "",
            message: ""
        }
    }

    async proceed(){
        const {navigate} = this.props.navigation;
        var code = this.state.barcode;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/check/' + code, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                }
            })
            .then((response) => {
                if(response.ok){
                    response.text().then((responseData) => {
                        if(responseData === "Not Registered"){
                            navigate('Register', {plant_id: code});
                        } else {
                            navigate('Record', {plant_id: code});
                        }
                        this.setState({message: ""});
                    });
                } else {
                    response.text().then((responseData) => {
                        console.log(responseData);
                        this.setState({message: responseData});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        return (
            <View style={styles.pageContent}>
                <Text>{this.state.message}</Text>
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({barcode: value})}
                   value={this.state.barcode}
                   placeholder={"Barcode"}
                   />
                   <Button onPress={this.proceed.bind(this)} title="Proceed" />
            </View>
        );
    }
}

var barcodeView = TabNavigator({
    Camera: {
        screen: CameraView
    },
    Manual: {
        screen: ManualView
    }
}, {
    tabBarOptions: {
        style: styles.tabBar,
        indicatorStyle: styles.tabIndicator,
        activeTintColor: '#4d4d4d',
        inactiveTintColor: '#8c8c8c'
    }
});

export default barcodeView;