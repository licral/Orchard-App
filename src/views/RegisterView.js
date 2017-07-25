import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import styles from '../styles/style.js';
import {
    AsyncStorage,
    Text,
    View,
    Picker,
    TextInput,
    Button,
    StatusBar,
    ActivityIndicator,
    ScrollView
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
        var date = dateobj.getFullYear() + "-" + (dateobj.getMonth() + 1) + "-" + dateobj.getDate();
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
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Calendar',
                                    params: {
                                        message: "Plant has been registered."
                                    }
                                })
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }
                })
                .done();
            } catch (error) {
                console.log("AsyncStorage error: " + error.message);
            }
        },
        (error) => {
            console.log("No location");
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
            var speciesItems = this.getPickerItems(this.state.speciesList);
            var varietyItems = this.getPickerItems(this.state.varietyList);
            return(
                <View style={styles.pageContent}>
                    <ScrollView>
                    <View style={styles.margin}>
                        <Text style={styles.heading}>Plant ID: {state.params.plant_id}</Text>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.label}>*Species</Text>
                        <Picker
                           selectedValue={this.state.species}
                           onValueChange = {(choice) => {
                            this.setState({species: choice});
                            this.setState({variety: ""});
                            }}>
                            {speciesItems}
                        </Picker>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.label}>*Variety</Text>
                        <Picker
                           selectedValue={this.state.variety}
                           onValueChange = {(choice) => this.setState({variety: choice})}
                           >
                            {varietyItems}
                        </Picker>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.label}>Visual Tag</Text>
                        <TextInput
                           underlineColorAndroid="#e7e4e4"
                           onChangeText={(visualt) => this.setState({visualTag: visualt})}
                           value={this.state.visualTag}
                           />
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput
                           underlineColorAndroid="#e7e4e4"
                           multiline = {true}
                           numberOfLines = {4}
                           onChangeText={(notes) => this.setState({notes: notes})}
                           value={this.state.notes}
                           />
                    </View>
                    <View style={styles.margin}>
                        <Button
                           onPress={this.registerPlant.bind(this)}
                           title="Register"
                           color="#fe4a49"
                           />
                    </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

export default registerView;