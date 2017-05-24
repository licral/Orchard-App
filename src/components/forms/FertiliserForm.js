import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import styles from '../../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    TextInput
} from 'react-native';

var STORAGE_KEY = 'id-token';

const fertiliserForm = class FertiliserForm extends Component{
    constructor(){
        super();
        this.state = {
            product: "",
            rate: "0"
        }
    }

    async record(activity_id){
        var product = this.state.product;
        var rate = this.state.rate;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/record/fertiliser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                },
                body: 'activity_id=' + encodeURIComponent(activity_id)
                    + '&product=' + encodeURIComponent(product)
                    + '&rate=' + encodeURIComponent(rate)
            })
            .then((response) => {
                if(response.ok){
                    this.props.navigateHome();
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({product: value})}
                   value={this.state.product}
                   placeholder={"Product"}
                   />
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({rate: value})}
                   value={this.state.rate}
                   placeholder={"Rate"}
                   />
            </View>
        );
    }
}

export default fertiliserForm;