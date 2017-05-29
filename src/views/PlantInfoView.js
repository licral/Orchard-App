import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';

var STORAGE_KEY = 'id-token';

var plantInfoView = class PlantInfoView extends Component{
    constructor(){
        super();
        this.state = {
            retrievedInfo: "",
            retrievedHistory: "",
            plantInfo: {},
            history: {}
        }
    }

    async getPlantInfo(){
        const {state} = this.props.navigation;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/plant/' + state.params.plant_id, {
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
                        this.setState({plantInfo: responseData});
                        this.setState({retrievedInfo: "Done"});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    async getActivityHistory(){
        const {state} = this.props.navigation;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/history/plant/' + state.params.plant_id, {
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
                        this.setState({history: responseData});
                        this.setState({retrievedHistory: "Done"});
                    });
                } else {
                    response.text().then((responseData) => {
                        if(responseData === "No Results"){
                            this.setState({retrievedHistory: "None"});
                        }
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    _navigateToActivity(id){
        const {navigate} = this.props.navigation;
        navigate('Activity', {activity_id: id});
    }

    processActivities(){
        if(this.state.retrievedHistory === "None"){
            return(
                <Text>No Activities</Text>
            );
        }
        var rawData = this.state.history;
        var activities = [];
        for(var i = 0; i < rawData.length; i++){
            var activity = rawData[i];
            activities.push(
                <TouchableNativeFeedback onPress={this._navigateToActivity.bind(this, activity["activity_id"])}>
                    <View style={styles.activityItem}>
                        <Text style={styles.itemHeader}>Plant ID: {activity["plant_id"]}</Text>
                        <Text>{activity["activity_type"]} - {activity["species"]}</Text>
                        <Text style={styles.itemDateTime}>{activity["date"]} {activity["time"]}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return activities;
    }

    processPlantInfo(){
        var rawData = this.state.plantInfo;
        var plantInfo = [];
        Object.keys(rawData).map(function(i){
            plantInfo.push(
                <Text>{i} : {rawData[i]}</Text>
            );
        });
        return plantInfo;
    }

    render () {
        if(this.state.retrievedHistory === ""){
            this.getActivityHistory();
        }
        if(this.state.retrievedInfo === ""){
            this.getPlantInfo();
        }
        if(this.state.retrievedHistory === "" || this.state.retrievedInfo === ""){
            return (
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                  />
            );
        } else {
            var activityHistory = this.processActivities();
            var plantInfo = this.processPlantInfo();
            return(
                <View style={styles.pageContent}>
                    <ScrollView>
                        <Text>===PLANT INFO===</Text>
                        {plantInfo}
                        <Text>===ACTIVITY HISTORY===</Text>
                        {activityHistory}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default plantInfoView;