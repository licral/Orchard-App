import React, { Component } from 'react';
import tForm from 'tcomb-form-native';
import styles from '../styles/style.js';
import {
    Text,
    View,
    AsyncStorage,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';
var Form = tForm.form.Form;
var Login = tForm.struct({
    username: tForm.String,
    password: tForm.String
});
const options = {};

var loginView = class LoginView extends Component{
    constructor(){
        super();
        this.state = {
            data: "No data yet"
        };
    }

    async _onValueChange(item, selectedValue){
        try{
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    async _getTest(){
        var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
        console.log(DEMO_TOKEN);
        fetch('https://orchard-app-java-tomcat.herokuapp.com/test', {
            method: 'GET',
            headers: {
                'Authorization': DEMO_TOKEN
            }
        })
        .then((response) => {
            if(response.ok){
                response.text().then((responseData) => {
                    this.setState({data: responseData});
                });
            } else {
                console.log("Not ok");
            }
        })
        .done();
    }

    _userLogin(){
        var value = this._form.getValue();
        console.log(value);
        if(value){
            fetch('https://orchard-app-java-tomcat.herokuapp.com/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'username=' + encodeURIComponent(value.username) + '&password=' + encodeURIComponent(value.password)
            })
            .then((response) => {
                if(response.ok){
                    response.json().then((responseData) => {
                        console.log(responseData);
                        this.setState({data: "logged in"});
                        this._onValueChange(STORAGE_KEY, responseData.id_token);
                    });
                } else {
                    console.log("Not ok");
                }
            })
            .done();
        }
    }

    async _userLogout(){
        try{
            await AsyncStorage.removeItem(STORAGE_KEY);
            this.setState({data: "Logged out now!"});
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        return (
            <View style={styles.pageContent}>
                <Form
                    ref={(input) => {this._form = input;}}
                    type={Login}
                    options={options}
                />
                <Button onPress={this._userLogin.bind(this)} title="Login" />
                <Button onPress={this._getTest.bind(this)} title="Test!" />
                <Button onPress={this._userLogout.bind(this)} title="Logout" />
                <Text>Got data: {this.state.data}</Text>
            </View>
        );
    }
}

export default loginView;