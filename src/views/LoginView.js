import React, { Component } from 'react';
import tForm from 'tcomb-form-native';
import styles from '../styles/style.js';
import {
    Text,
    View,
    AsyncStorage,
    Button,
    TextInput,
    ActivityIndicator,
    Image
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
            message: "",
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
                        this._setToken('username', username);
                    });
                } else {
                    console.log("Not ok");
                    this.setState({message: "Your login credentials are incorrect."});
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

    getErrorMessage(){
        if(this.state.message == ""){
            return null;
        } else {
            return(
                <Text style={styles.errorMessage}>{this.state.message}</Text>
            );
        }
    }

    render () {
        var errorMessage = this.getErrorMessage();
        return (
            <Image style={{flex: 1, width: null, height: null}} source={require('../img/splashback.jpg')}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.loginPanel}>
                        <View style={styles.logo}>
                            <Image source={require('../img/logo.png')} />
                        </View>
                        {errorMessage}
                        <TextInput
                            underlineColorAndroid="#e7e4e4"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            placeholder={"Username"}
                            />
                        <TextInput
                            underlineColorAndroid="#e7e4e4"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            placeholder={"Password"}
                            />
                        <Button
                           onPress={this._userLogin.bind(this)}
                           title="Login"
                           color="#43a047"
                           />
                        {this._isLoading()}
                    </View>
                </View>
            </Image>
        );
    }
}

export default loginView;