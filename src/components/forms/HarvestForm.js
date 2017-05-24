import React, { Component } from 'react';
import { DrawerItems } from 'react-navigation';
import styles from '../../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    TextInput
} from 'react-native';

var STORAGE_KEY = 'id-token';

const harvestForm = class HarvestForm extends Component{
    constructor(){
        super();
        this.state = {
            weight: "0"
        }
    }

    record(){
        console.log("Called in chemical!");
    }

    render () {
        return (
            <View style={styles.container}>
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({weight: value})}
                   value={this.state.weight}
                   placeholder={"Weight"}
                   />
            </View>
        );
    }
}

export default harvestForm;