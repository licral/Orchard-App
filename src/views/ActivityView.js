import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';

var STORAGE_KEY = 'id-token';

var activityView = class ActivityView extends Component{
    constructor(){
        super();
        this.state = {
            retrieved: "",
            activityInfo: {}
        }
    }

    async getActivityInfo(){
        const {state} = this.props.navigation;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/activity/' + state.params.activity_id, {
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
                        this.setState({activityInfo: responseData});
                        this.setState({retrieved: "Done"});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    processActivity(){
        var rawData = this.state.activityInfo;
        var activityInfo = [];
        var today = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var current = new Date(rawData["Date"]);
        if(today.getDate() == current.getDate() && today.getMonth() == current.getMonth() && today.getFullYear() == current.getFullYear()){
            date_string = "Today";
        } else {
            date_string = weekday[current.getDay()] + ", " + current.getDate() + "/" + (current.getMonth() + 1) + "/" + current.getFullYear();
        }
        var time = rawData["Time"].split(":");
        var hour = time[0];
        var minute = time[1];
        var end = "AM";
        if(hour >= 12){
            end = "PM";
        }
        if(hour > 12){
            hour = hour - 12;
        }

        var activityDetails = null;

        if(rawData["Activity Type"] === "Fertiliser" || rawData["Activity Type"] === "Chemical Sprayed"){
            activityDetails = [
                <Text>Product: {rawData["Product"]}</Text>,
                <Text>Rate: {rawData["Rate"]}</Text>
            ];
        } else if(rawData["Activity Type"] === "Harvest"){
            activityDetails = (
                <Text>Weight: {rawData["Weight"]}kg</Text>
            );
        }

        activityInfo.push(
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
                    <Icon name="calendar-clock" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <View>
                        <Text style={{fontSize: 18, color: 'black'}}>{date_string}</Text>
                        <Text style={{fontSize: 18, color: 'black'}}>{hour}:{minute} {end}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="book" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <View>
                        <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Activity Type"]}</Text>
                        {activityDetails}
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Icon name="lead-pencil" style={{fontSize: 25, color: '#fe4a49', marginRight: 20}} />
                    <Text style={{flex: 1, fontSize: 18, color: 'black'}}>{rawData["Notes"] ? rawData["Notes"] : "No notes taken."}</Text>
                </View>
            </View>
        );
        return activityInfo;
    }

    render () {
        if(this.state.retrieved === ""){
            this.getActivityInfo();
        }
        if(this.state.retrieved === ""){
            return (
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                  />
            );
        } else {
            var activityInfo = this.processActivity();
            return (
                <View style={styles.pageContent}>
                    <ScrollView>
                        {activityInfo}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default activityView;
