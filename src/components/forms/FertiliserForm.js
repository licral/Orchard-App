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
            rate: "0",
            productMessage: "",
            rateMessage: ""
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

    check(){
        var check = true;
        if(this.state.product === ""){
            this.setState({productMessage: "Please enter a product"});
            check = false;
        } else {
            this.setState({productMessage: ""});
        }
        if(this.state.rate == 0){
            this.setState({rateMessage: "Please enter a rate"})
            check = false;
        } else if(isNaN(this.state.rate) || this.state.rate < 0){
            this.setState({rateMessage: "Rate is invalid"})
            check = false;
        } else {
            this.setState({rateMessage: ""});
        }

        return check;
    }

    getErrorMessage(type){
        if(type === "product"){
            if(this.state.productMessage == ""){
                return null;
            } else {
                return(
                    <Text style={styles.errorMessage}>{this.state.productMessage}</Text>
                );
            }
        } else if(type === "rate"){
           if(this.state.rateMessage == ""){
               return null;
           } else {
               return(
                   <Text style={styles.errorMessage}>{this.state.rateMessage}</Text>
               );
           }
       }
        return null;
    }

    render () {
        var productError = this.getErrorMessage("product");
        var rateError = this.getErrorMessage("rate");
        return (
            <View style={styles.container}>
                <View style={styles.margin}>
                    <Text style={styles.label}>*Product</Text>
                    <TextInput
                       underlineColorAndroid="#e7e4e4"
                       onChangeText={(value) => this.setState({product: value})}
                       value={this.state.product}
                       />
                    {productError}
                </View>
                <View style={styles.margin}>
                    <Text style={styles.label}>*Rate</Text>
                    <TextInput
                       underlineColorAndroid="#e7e4e4"
                       onChangeText={(value) => this.setState({rate: value})}
                       value={this.state.rate}
                       />
                    {rateError}
                </View>
            </View>
        );
    }
}

export default fertiliserForm;