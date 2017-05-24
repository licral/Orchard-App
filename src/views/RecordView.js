import React, { Component } from 'react';
import FertiliserForm from '../components/forms/FertiliserForm.js';
import ChemicalForm from '../components/forms/ChemicalForm.js';
import HarvestForm from '../components/forms/HarvestForm.js';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    Picker,
    TextInput,
    View,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';

var recordView = class RecordView extends Component{
    constructor(){
        super();
        this.state = {
            activity: "",
            activityList: {},
            notes: ""
        }
    }

    async getActivities(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/activities', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                }
            })
            .then((response) => {
                if(response.ok){
                    response.json().then((responseData) => {
                        this.setState({activityList: responseData});
                        this.setState({activity: Object.keys(responseData)[0]});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    getPickerItems(itemList){
        var pickers = [];
        Object.keys(itemList).map(function(key){
            pickers.push(
                <Picker.Item label={itemList[key]} value={key} />
            );
        });
        return pickers;
    }

    currentForm(){
        var activityType = this.state.activityList[this.state.activity];
        if(activityType === "Fertiliser"){
            return (
                <FertiliserForm ref='form' />
            );
        } else if(activityType === "Chemical Sprayed"){
            return (
                <ChemicalForm ref='form' />
            );
        } else if(activityType === "Harvest"){
            return (
                <HarvestForm ref='form' />
            );
        }
        else {
            return null;
        }
    }

    record(){
        var form = this.refs.form;
        if(form != undefined){
            form.record();
        }
    }

    render () {
        if(this.state.activity === ""){
            this.getActivities();
        }
        const {state} = this.props.navigation;
        if(this.state.activity === ""){
            return(
                <View style={styles.pageContent}>
                   <Text>Loading</Text>
               </View>
            );
        } else {
            var activityItems = this.getPickerItems(this.state.activityList);
            return (
                <View style={styles.pageContent}>
                     <Text>{state.params.plant_id}</Text>
                     <Picker
                     selectedValue={this.state.activity}
                     onValueChange = {(choice) => this.setState({activity: choice})}>
                         {activityItems}
                    </Picker>
                    {this.currentForm()}
                    <TextInput
                       style={styles.loginInput}
                       multiline = {true}
                       numberOfLines = {4}
                       onChangeText={(notes) => this.setState({notes: notes})}
                       value={this.state.notes}
                       placeholder={"Notes"}
                       />
                    <Button onPress={this.record.bind(this)} title="Record" />
                </View>
            );
        }
    }
}

export default recordView;