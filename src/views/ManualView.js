import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';

var manualView = class ManualView extends Component{
    constructor(){
        super();
        this.state = {
            barcode: "",
            message: ""
        }
    }

    async proceed(){
        if(this.state.barcode === ""){
            this.setState({message: "Please enter a code first"});
        } else {
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
            <View style={styles.pageContent}>
                <View style={styles.margin}>
                    <TextInput
                       underlineColorAndroid="#e7e4e4"
                       onChangeText={(value) => this.setState({barcode: value})}
                       value={this.state.barcode}
                       placeholder={"Enter plant ID here"}
                       />
                    {errorMessage}
                </View>
                    <View style={styles.button}>
                        <Button
                           onPress={this.proceed.bind(this)}
                           title="Submit"
                           color="#fe4a49"
                           />
                    </View>
            </View>
        );
    }
}

export default manualView;