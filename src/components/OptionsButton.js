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
            activityFilterList: {},
            speciesFilterList: {}
        };
        this.getActivityTypes();
        this.getSpecies();
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
                        this.setState({speciesFilterList: responseData});
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    filterActivityCallback(filterList){
        this.props.navigation.setParams({activityFilters: filterList.slice()});
        this.setState({menuOpen: 0});
    }

    filterSpeciesCallback(filterList){
        this.props.navigation.setParams({speciesFilters: filterList.slice()});
        this.setState({menuOpen: 0});
    }

    cancelCallback(){
        this.setState({menuOpen: 0});
    }

    getFilter(){
        const navigate = this.props.navigation;
        var activityFilters = navigate.state.params && navigate.state.params.activityFilters ? navigate.state.params.activityFilters : [];
        var speciesFilters = navigate.state.params && navigate.state.params.speciesFilters ? navigate.state.params.speciesFilters : [];
        if(this.state.menuOpen == 1){
            return Sort;
        } else if(this.state.menuOpen == 2){
            return <FilterView list={this.state.activityFilterList}
                done={this.filterActivityCallback.bind(this)}
                cancel={this.cancelCallback.bind(this)}
                highlighted={activityFilters} />;
        } else if(this.state.menuOpen == 3){
            return <FilterView list={this.state.speciesFilterList}
                done={this.filterSpeciesCallback.bind(this)}
                cancel={this.cancelCallback.bind(this)}
                highlighted={speciesFilters} />;
        } else if(this.state.menuOpen == 4){
            return DateFilter;
        } else if(this.state.menuOpen == 5){
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
                    <MenuOptions customStyles={{optionWrapper: {padding: 10}}}>
                        <MenuOption value={1} text='Sort by...' />
                        <MenuOption value={2} text='Filter by Activity Type' />
                        <MenuOption value={3} text='Filter by Plant Species' />
                        <MenuOption value={4} text='Filter by Plant Variety' />
                        <MenuOption value={5} text='Filter by Date' />
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
