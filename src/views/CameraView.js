import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View
} from 'react-native';

var STORAGE_KEY = 'id-token';

var cameraView = class CameraView extends Component{
    constructor(){
        super();
        this.state = {
            data: "No data yet"
        };
    }

    async onSuccess(e){
        const {navigate} = this.props.navigation;
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/check/' + e.data, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                }
            })
            .then((response) => {
                if(response.ok){
                    navigate('Record', {plant_id: e.data});
                } else {
                    navigate('Register', {plant_id: e.data});
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    async isRegistered(plant_id){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/check/' + plant_id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': TOKEN
                }
            })
            .then((response) => {
                return response.ok;
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render () {
        return (
            <View style={styles.pageContent}>
                <QRCodeScanner
                     onRead={this.onSuccess.bind(this)}
                     topViewStyle={{height: 0, flex: 0}}
                     />
                <View>
                    <Text>{this.state.data}</Text>
                </View>
            </View>
        );
    }
}

export default cameraView;