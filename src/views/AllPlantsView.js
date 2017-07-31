import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    StatusBar,
    ActivityIndicator,
    ScrollView,
    TouchableNativeFeedback,
    Button,
    RefreshControl
} from 'react-native';

var STORAGE_KEY = 'id-token';

var calendarView = class CalendarView extends Component {
    constructor(){
        super();
        this.state = {
            retrieved: "",
            plants: [],
            none: false,
            refreshing: false
        }
    }

    componentDidMount(){
        const {state} = this.props.navigation;
        if(state.params && state.params.message){
            Toast.show(state.params.message);
            state.params.message = null;
        }
    }

    async getAllPlants(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/plant/all', {
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
                        this.setState({plants: responseData});
                        this.setState({retrieved: "Done"});
                    });
                } else {
                    this.setState({none: true});
                    this.setState({retrieved: "Done"});
                }
                this.setState({refreshing: false});
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    _navigateToPlant(id){
        const {navigate} = this.props.navigation;
        navigate('PlantView', {plant_id: id});
    }

    processData(){
        if(this.state.none){
            return (<Text style={styles.margin}>No Plants Found</Text>);
        }
        var rawData = this.state.plants;
        var plants = [];
        for(var i = 0; i < rawData.length; i++){
            var plant = rawData[i];
            plants.push(
                <TouchableNativeFeedback onPress={this._navigateToPlant.bind(this, plant["plant_id"])}>
                    <View style={styles.activityItem}>
                        <Text style={styles.itemHeader}>Plant ID: {plant["plant_id"]}</Text>
                        <Text>{plant["species"]} - {plant["variety"]}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return plants;
    }

    _onRefresh(){
        this.setState({refreshing: true});
        this.setState({retrieved: ""});
    }

   render() {
        if(this.state.retrieved === ""){
            this.getAllPlants();
        }
        const {navigate} = this.props.navigation;
        if(this.state.retrieved === ""){
            return (
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <ActivityIndicator
                        animating={true}
                        style={{height: 80}}
                        size="large"
                      />
                </View>
            );
        }else {
            var allPlants = this.processData();
            return(
                <View style={styles.pageContent}>
                    <StatusBar
                        backgroundColor="#43a047"
                        barStyle="light-content"
                        />
                    <ScrollView
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />}
                      >
                        {allPlants}
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