import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var cameraView = class CameraView extends Component{
    constructor(){
        super();
        this.state = {
            data: "No data yet"
        };
    }

    onSuccess(e){
        const {navigate} = this.props.navigation;
        const {state} = this.props.navigation;
        if(state.params.action === "register"){
            navigate('Register', {plant_id: e.data});
        } else {
            console.log(state.params.action);
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