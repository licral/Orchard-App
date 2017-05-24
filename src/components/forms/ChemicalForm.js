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

const chemicalForm = class ChemicalForm extends Component{
    constructor(){
        super();
        this.state = {
            product: "",
            rate: "0"
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
                   onChangeText={(value) => this.setState({product: value})}
                   value={this.state.product}
                   placeholder={"Product"}
                   />
                <TextInput
                   style={styles.loginInput}
                   onChangeText={(value) => this.setState({rate: value})}
                   value={this.state.rate}
                   placeholder={"Rate"}
                   />
            </View>
        );
    }
}

export default chemicalForm;