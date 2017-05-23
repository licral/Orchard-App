import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    Picker
} from 'react-native';

var STORAGE_KEY = 'id-token';

var registerView = class RegisterView extends Component {
    constructor(){
        super();
        this.state = {
            species: "",
            speciesList: {}
        }
    }

    async getSpecies(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/species', {
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
                        this.setState({speciesList: responseData});
                        this.setState({species: Object.keys(responseData)[0]});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    render() {
        if(this.state.species === ""){
            this.getSpecies();
        }
        const {state} = this.props.navigation;
        if(this.state.species === ""){
            return(
                <View style={styles.pageContent}>
                   <Text>Loading</Text>
               </View>
            );
        } else {
            var speciesItems = []
            var itemList = this.state.speciesList;
            Object.keys(itemList).map(function(key){
                speciesItems.push(
                    <Picker.Item label={itemList[key]} value={key} />
                );
            });
            return(
               <View style={styles.pageContent}>
                   <Text>{state.params.code}</Text>
                   <Picker
                    selectedValue={this.state.species}
                    onValueChange = {(choice) => this.setState({species: choice})}>
                        {speciesItems}
                   </Picker>
               </View>
            );
        }
    }
}

export default registerView;