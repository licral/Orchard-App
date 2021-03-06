import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            var date = new Date(activity["date"]);
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var date_string = weekday[date.getDay()] + ", " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            var time = activity["time"].split(":");
            var hour = time[0];
            var minute = time[1];
            var end = "AM";
            if(hour >= 12){
                end = "PM";
            }
            if(hour > 12){
                hour = hour - 12;
            }
            activities.push(
                <TouchableNativeFeedback onPress={this._navigateToActivity.bind(this, activity["activity_id"])}>
                    <View style={styles.activityItem}>
                        <Text style={styles.itemHeader}>{activity["activity_type"]} - {activity["species"]} - {activity["variety"]}</Text>
                        <Text>Plant ID: {activity["plant_id"]}</Text>
                        <Text style={styles.itemDateTime}>{date_string} {hour}:{minute} {end}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return activities;
    }

    processPlantInfo(){
        var rawData = this.state.plantInfo;
        var plantInfo = [];
        var today = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var current = new Date(rawData["Date Planted"]);
        if(today.getDate() == current.getDate() && today.getMonth() == current.getMonth() && today.getFullYear() == current.getFullYear()){
            date_string = "Today";
        } else {
            date_string = weekday[current.getDay()] + ", " + current.getDate() + "/" + (current.getMonth() + 1) + "/" + current.getFullYear();
        }

        plantInfo.push(
            <View style={styles.margin}>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="qrcode" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Plant ID"]}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="leaf" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Species"]} - {rawData["Variety"]}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="tag" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Visual Tag"] ? rawData["Visual Tag"] : "No visual tag recorded."}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="calendar-clock" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <View>
                        <Text style={{fontSize: 18, color: 'black'}}>{date_string}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="map-marker" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Latitude"]}, {rawData["Longitude"]}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="lead-pencil" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Notes"] ? rawData["Notes"] : "No notes taken."}</Text>
                </View>
            </View>
        );
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
                        {plantInfo}
                        <View style={styles.margin}>
                            <Text style={styles.heading}>Activity History</Text>
                        </View>
                        {activityHistory}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default plantInfoView;
