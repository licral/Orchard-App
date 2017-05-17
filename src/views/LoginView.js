import React, { Component } from 'react';
import tForm from 'tcomb-form-native';
import styles from '../styles/style.js';
import {
    Text,
    View,
    AsyncStorage,
    Button,
    TextInput,
    ActivityIndicator
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
            username: "",
            password: "",
            loading: false
        };
    }

    async _setToken(item, selectedValue){
        try{
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    _userLogin(){
        this.setState({loading: true});
        var username = this.state.username;
        var password = this.state.password;
        if(username != "" && password != ""){
            fetch('https://orchard-app-java-tomcat.herokuapp.com/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
            })
            .then((response) => {
                this.setState({loading: false})
                if(response.ok){
                    response.json().then((responseData) => {
                        this._setToken(STORAGE_KEY, responseData.id_token);
                    });
                } else {
                    console.log("Not ok");
                }
            })
            .done();
        }
    }

    _isLoading(){
        if(this.state.loading){
            return(
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                  />
            );
        } else {
            return null;
        }
    }

    render () {
        return (
            <View style={styles.pageContent}>
                <View style={{flex: 1, backgroundColor: '#80d4ff'}}>
                    <Text>Logo Placeholder</Text>
                </View>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        placeholder={"Username"}
                        />
                    <TextInput
                        style={styles.loginInput}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder={"Password"}
                        />
                    <Button onPress={this._userLogin.bind(this)} title="Login" />
                    {this._isLoading()}
                </View>
            </View>
        );
    }
}

export default loginView;