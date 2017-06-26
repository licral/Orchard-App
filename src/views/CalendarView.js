import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    StatusBar,
    ActivityIndicator,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';

var STORAGE_KEY = 'id-token';

var calendarView = class CalendarView extends Component {
    constructor(){
        super();
        this.state = {
            retrieved: "",
            history: [],
            none: false
        }
    }

    async getActivityHistory(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/history/all', {
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
                        this.setState({retrieved: "Done"});
                    });
                } else {
                    this.setState({none: true});
                    this.setState({retrieved: "Done"});
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
        var rawData = this.state.history;
        var activities = [];
        var today = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var current;
        for(var i = 0; i < rawData.length; i++){
            var activity = rawData[i];
            var date = new Date(activity["date"]);
            if(current == undefined || date.getDate() != current.getDate() || date.getMonth() != current.getMonth() || date.getFullYear() != current.getFullYear()){
                current = date;
                var date_string;
                if(today.getDate() == current.getDate() && today.getMonth() == current.getMonth() && today.getFullYear() == current.getFullYear()){
                    date_string = "Today";
                } else {
                    date_string = weekday[current.getDay()] + ", " + current.getDate() + "/" + (current.getMonth() + 1) + "/" + current.getFullYear();
                }
                activities.push(
                    <View style={styles.margin}>
                        <Text style={styles.heading}>{date_string}</Text>
                    </View>
                );
            }
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
                        <Text style={styles.itemDateTime}>{hour}:{minute} {end}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return activities;
    }

   render() {
        if(this.state.retrieved === ""){
            this.getActivityHistory();
        }
        const {navigate} = this.props.navigation;
        if(this.state.retrieved === ""){
            return (
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                  />
            );
        } else if(this.state.none) {
            return(
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <View>
                        <Text>No Activities Found</Text>
                    </View>
                    <ActionButton buttonColor="rgba(255,0,0,1)">
                        <ActionButton.Item
                            buttonColor="#ff0000"
                            title="Record New Activity"
                            onPress={() => {
                                this.setState({retrieved: ""});
                                navigate('Barcode', {action: 'record'});
                                }}>
                            <Icon name="create" style={styles.newButton} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor="#ff0000"
                            title="Register New Plant"
                            onPress={() => {
                                this.setState({retrieved: ""});
                                navigate('Barcode', {action: 'register'});
                                }}>
                            <Icon name="local-florist" style={styles.newButton} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            );
        } else {
            var activityHistory = this.processActivities();
            return(
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <ScrollView>
                        {activityHistory}
                    </ScrollView>
                    <ActionButton buttonColor="rgba(255,0,0,1)">
                        <ActionButton.Item
                            buttonColor="#ff0000"
                            title="Record New Activity"
                            onPress={() => {
                                this.setState({retrieved: ""});
                                navigate('Barcode', {action: 'record'});
                                }}>
                            <Icon name="create" style={styles.newButton} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor="#ff0000"
                            title="Register New Plant"
                            onPress={() => {
                                this.setState({retrieved: ""});
                                navigate('Barcode', {action: 'register'});
                                }}>
                            <Icon name="local-florist" style={styles.newButton} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            );
        }
   }
}

export default calendarView;