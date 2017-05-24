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
            weight: "0"
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

    render () {
        return (
            <View style={styles.container}>
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({weight: value})}
                   value={this.state.weight}
                   placeholder={"Weight"}
                   />
            </View>
        );
    }
}

export default harvestForm;