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
    ScrollView
} from 'react-native';

var STORAGE_KEY = 'id-token';

var calendarView = class CalendarView extends Component {
    constructor(){
        super();
        this.state = {
            retrieved: "",
            history: []
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
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    processActivities(){
        var rawData = this.state.history;
        var activities = [];
        for(var i = 0; i < rawData.length; i++){
            var activity = rawData[i];
            Object.keys(activity).map(function(key){
                activities.push(
                    <Text>{key} : {activity[key]}</Text>
                );
            });
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