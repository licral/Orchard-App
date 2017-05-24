import React, { Component } from 'react';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    Picker,
    TextInput,
    Button
} from 'react-native';

var STORAGE_KEY = 'id-token';

var registerView = class RegisterView extends Component {
    constructor(){
        super();
        this.state = {
            species: "",
            speciesList: {},
            variety: "",
            varietyList: {},
            visualTag: "",
            notes: ""
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

    async getVariety(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/variety/' + this.state.species, {
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
                        this.setState({varietyList: responseData});
                        this.setState({variety: Object.keys(responseData)[0]});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    getPickerItems(itemList){
        var pickers = [];
        Object.keys(itemList).map(function(key){
            pickers.push(
                <Picker.Item label={itemList[key]} value={key} />
            );
        });
        return pickers;
    }

    async registerPlant(){
        const {state} = this.props.navigation;
        var plant_id = state.params.plant_id;
        var visual_tag = this.state.visualTag;
        var variety_id = this.state.variety;
        var notes = this.state.notes;
        var dateobj = new Date();
        var date = dateobj.getDate() + "/" + (dateobj.getMonth() + 1) + "/" + dateobj.getFullYear();
        navigator.geolocation.getCurrentPosition(async (position) => {
            var longitude = position['coords']['longitude'];
            var latitude = position['coords']['latitude'];
            try{
                var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
                fetch('https://orchard-app-java-tomcat.herokuapp.com/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': TOKEN
                    },
                    body: 'plant_id=' + encodeURIComponent(plant_id)
                        + '&visual_tag=' + encodeURIComponent(visual_tag)
                        + '&variety_id=' + encodeURIComponent(variety_id)
                        + '&longitude=' + encodeURIComponent(longitude)
                        + '&latitude=' + encodeURIComponent(latitude)
                        + '&date=' + encodeURIComponent(date)
                        + '&notes=' + encodeURIComponent(notes)
                })
                .then((response) => {
                    if(response.ok){
//                        response.json().then((responseData) => {
//                            this.setState({varietyList: responseData});
//                            this.setState({variety: Object.keys(responseData)[0]});
//                        });
//                        response.text().then((responseData) => {
//                            console.log(responseData);
//                        });
                        console.log("Ok");
                    }
                })
                .done();
            } catch (error) {
                console.log("AsyncStorage error: " + error.message);
            }
        });
    }

    render() {
        if(this.state.species === ""){
            this.getSpecies();
        } else if(this.state.variety === ""){
            this.getVariety();
        }
        const {state} = this.props.navigation;
        if(this.state.species === "" || this.state.variety === ""){
            return(
                <View style={styles.pageContent}>
                   <Text>Loading</Text>
               </View>
            );
        } else {
            var speciesItems = this.getPickerItems(this.state.speciesList);
            var varietyItems = this.getPickerItems(this.state.varietyList);
            return(
               <View style={styles.pageContent}>
                   <Text>{state.params.plant_id}</Text>
                   <Picker
                    selectedValue={this.state.species}
                    onValueChange = {(choice) => {
                        this.setState({species: choice});
                        this.getVariety();
                        }}>
                        {speciesItems}
                   </Picker>
                   <Picker
                    selectedValue={this.state.variety}
                    onValueChange = {(choice) => this.setState({variety: choice})}>
                        {varietyItems}
                   </Picker>
                   <TextInput
                       style={styles.loginInput}
                       onChangeText={(visualt) => this.setState({visualTag: visualt})}
                       value={this.state.visualTag}
                       placeholder={"Visual Tag"}
                       />
                   <TextInput
                       style={styles.loginInput}
                       multiline = {true}
                       numberOfLines = {4}
                       onChangeText={(notes) => this.setState({notes: notes})}
                       value={this.state.notes}
                       placeholder={"Notes"}
                       />
                    <Button onPress={this.registerPlant.bind(this)} title="Register" />
               </View>
            );
        }
    }
}

export default registerView;