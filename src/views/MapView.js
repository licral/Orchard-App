import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    ActivityIndicator,
    StatusBar,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

var STORAGE_KEY = 'id-token';

var mapViewComponent = class MapViewComponent extends Component{
    constructor(){
        super();
        this.state = {
            retrieved: "",
            plants: [],
            none: false,
            refreshing: false,
            markers: []
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
                        this.processCoordinates();
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

    processCoordinates(){
        var m = [];
        this.state.plants.map( p => {
            m.push({
                latitude: Number(p.latitude),
                longitude: Number(p.longitude)
            });
        });
        this.setState({markers: m.slice()});
    }

    fitAllMarkers(){
        this.map.fitToCoordinates(
            this.state.markers, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: false
            });
    }

    render () {
        if(this.state.retrieved === ""){
            this.getAllPlants();
        }
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
        } else {
            var plants = this.state.plants;
            return (
                <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <MapView
                      ref = {r => this.map = r}
                      style={{...StyleSheet.absoluteFillObject}}
                      onMapReady = {() => this.fitAllMarkers()}>
                        {plants.map( p => (
                            <MapView.Marker coordinate={{
                                    latitude: Number(p.latitude),
                                    longitude: Number(p.longitude)
                                }} />
                        ))}
                    </MapView>
                </View>
            );
        }
    }
}

export default mapViewComponent;
