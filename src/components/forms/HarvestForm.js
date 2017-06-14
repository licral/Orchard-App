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

const harvestForm = class HarvestForm extends Component{
    constructor(){
        super();
        this.state = {
            weight: "0",
            weightMessage: ""
        }
    }

    async record(activity_id){
        var weight = this.state.weight;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/record/harvest', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                },
                body: 'activity_id=' + encodeURIComponent(activity_id)
                    + '&weight=' + encodeURIComponent(weight)
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
        if(this.state.weight == 0){
            this.setState({weightMessage: "Please enter a weight"})
            check = false;
        } else if(isNaN(this.state.weight) || this.state.weight < 0){
            this.setState({weightMessage: "Weight is invalid"})
            check = false;
        } else {
            this.setState({weightMessage: ""});
        }

        return check;
    }

    getErrorMessage(){
        if(this.state.weightMessage == ""){
            return null;
        } else {
            return(
                <Text style={styles.errorMessage}>{this.state.weightMessage}</Text>
            );
        }
    }

    render () {
        var errorMessage = this.getErrorMessage();
        return (
            <View style={styles.container}>
                <View style={styles.margin}>
                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                       underlineColorAndroid="#e7e4e4"
                       onChangeText={(value) => this.setState({weight: value})}
                       value={this.state.weight}
                       />
                    {errorMessage}
                </View>
            </View>
        );
    }
}

export default harvestForm;