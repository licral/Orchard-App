import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
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
    Button,
    ScrollView
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
                <FertiliserForm ref='form' navigateHome={this.navigateHome.bind(this)} />
            );
        } else if(activityType === "Chemical Sprayed"){
            return (
                <ChemicalForm ref='form' navigateHome={this.navigateHome.bind(this)} />
            );
        } else if(activityType === "Harvest"){
            return (
                <HarvestForm ref='form' navigateHome={this.navigateHome.bind(this)} />
            );
        }
        else {
            return null;
        }
    }

    navigateHome(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Calendar',
                    params: {
                        message: "Activity has been recorded."
                    }
                })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    async record(){
        const {state} = this.props.navigation;
        var plant_id = state.params.plant_id;
        var dateobj = new Date();
        var date = dateobj.getFullYear() + "-" + (dateobj.getMonth() + 1) + "-" + dateobj.getDate();
        var time = dateobj.getHours() + ":" + dateobj.getMinutes() + ":00";
        var notes = this.state.notes;
        var type_id = this.state.activity;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/record/general', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                },
                body: 'plant_id=' + encodeURIComponent(plant_id)
                    + '&date=' + encodeURIComponent(date)
                    + '&time=' + encodeURIComponent(time)
                    + '&notes=' + encodeURIComponent(notes)
                    + '&type_id=' + encodeURIComponent(type_id)
            })
            .then((response) => {
                if(response.ok){
                    response.json().then((responseData) => {
                        var form = this.refs.form;
                        if(form != undefined){
                            form.record(responseData["id"]);
                        } else {
                            this.navigateHome();
                        }
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
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
                    <ScrollView>
                        <View style={styles.margin}>
                            <Text style={styles.dateHeadingText}>Plant ID: {state.params.plant_id}</Text>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.label}>activity Type</Text>
                            <Picker
                               selectedValue={this.state.activity}
                               onValueChange = {(choice) => this.setState({activity: choice})}
                               >
                                {activityItems}
                            </Picker>
                        </View>
                        {this.currentForm()}
                        <View style={styles.margin}>
                            <Text style={styles.label}>Notes</Text>
                            <TextInput
                           underlineColorAndroid="#e7e4e4"
                               multiline = {true}
                               numberOfLines = {4}
                               onChangeText={(notes) => this.setState({notes: notes})}
                               value={this.state.notes}
                               />
                        </View>
                        <View style={styles.margin}>
                            <Button
                               onPress={this.record.bind(this)}
                               title="Record"
                               color="#fe4a49"
                               />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

export default recordView;