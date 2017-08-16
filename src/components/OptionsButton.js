import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuContext,
    MenuTrigger
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import FilterView from './FilterView.js';
import styles from '../styles/style.js';
import {
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    View,
    Text,
    AsyncStorage
} from 'react-native';

var STORAGE_KEY = 'id-token';

const Sort = (
    <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Icon name="close" style={[styles.modalIcon, {color: '#fe4a49'}]} />
            <View style={{flex: 1}}></View>
            <Icon name="done" style={[styles.modalIcon, {color: '#43a047'}]} />
        </View>
        <View style={{padding: 22}}>
            <Text>Sort by...</Text>
        </View>
    </View>
);

const PlantFilter = (
    <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Icon name="close" style={[styles.modalIcon, {color: '#fe4a49'}]} />
            <View style={{flex: 1}}></View>
            <Icon name="done" style={[styles.modalIcon, {color: '#43a047'}]} />
        </View>
        <View style={{padding: 22}}>
            <Text>Filter by plant type</Text>
        </View>
    </View>
);

const DateFilter = (
    <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Icon name="close" style={[styles.modalIcon, {color: '#fe4a49'}]} />
            <View style={{flex: 1}}></View>
            <Icon name="done" style={[styles.modalIcon, {color: '#43a047'}]} />
        </View>
        <View style={{padding: 22}}>
            <Text>Filter by date</Text>
        </View>
    </View>
);

class OptionsButton extends Component{
    constructor(){
        super();
        this.state = {
            menuOpen: 0,
            activityFilterList: {}
        };
        this.getActivityTypes();
    }

    async getActivityTypes(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/activities', {
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
                        this.setState({activityFilterList: responseData});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    filterActivityCallback(activities){
        console.log("Got here");
        console.log(activities);
        this.setState({menuOpen: 0});
    }

    cancelCallback(){
        this.setState({menuOpen: 0});
    }

    getFilter(){
        if(this.state.menuOpen == 1){
            return Sort;
        } else if(this.state.menuOpen == 2){
            return <FilterView list={this.state.activityFilterList}
                done={this.filterActivityCallback.bind(this)}
                cancel={this.cancelCallback.bind(this)}/>;
        } else if(this.state.menuOpen == 3){
            return PlantFilter;
        } else if(this.state.menuOpen == 4){
            return DateFilter;
        } else {
            return <View></View>;
        }
    }

    render(){
        var filter = this.getFilter();
        return(
            <View>
                <Menu name="filterMenu" onSelect={value => this.setState({menuOpen: value})}>
                    <MenuTrigger>
                        <Icon name="more-vert" style={styles.headerRightIcon} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value={1} text='Sort by...' />
                        <MenuOption value={2} text='Filter by Activity Type' />
                        <MenuOption value={3} text='Filter by Plant Type' />
                        <MenuOption value={4} text='Filter by Date' />
                    </MenuOptions>
                </Menu>
                <TouchableWithoutFeedback onPress={() => {this.setState({menuOpen: 0})}}>
                    <Modal isVisible={this.state.menuOpen > 0} style={{justifyContent: 'flex-end', margin: 0}}>
                        {filter}
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default OptionsButton;
