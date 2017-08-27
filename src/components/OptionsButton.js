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
            activityFilterList: [],
            speciesFilterList: [],
            varietyFilterList: [],
            speciesVarietyList: []
        };
        this.getActivityTypes();
        this.getSpeciesVariety();
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

    async getSpeciesVariety(){
        try{
            var TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
            fetch('https://orchard-app-java-tomcat.herokuapp.com/get/speciesVariety', {
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
                        this.setState({speciesVarietyList: responseData});
                        this.processSpeciesVariety();
                    });
                }
            })
            .done();
        } catch (error) {
            console.log("AsyncStorage error: " + error.message);
        }
    }

    processSpeciesVariety(){
        var speciesList = this.state.speciesVarietyList;
        var slist = [];
        var vlist = [];
        var newList = {};
        speciesList.map(speciesObj => {
            var key = Object.values(speciesObj)[0];
            slist.push(key);
            var value = [];
            var varietyList = Object.values(speciesObj)[1];
            varietyList.map(varietyObj => {
                value.push(Object.values(varietyObj)[0]);
                vlist.push(Object.values(varietyObj)[0]);
            });
            newList[key] = value;
        });
        this.setState({speciesFilterList: slist.slice()});
        this.setState({varietyFilterList: vlist.slice()});
        this.setState({speciesVarietyList: newList});
    }

    updateVarietyList(speciesList){
        var newVarietyList = [];
        var svlist = this.state.speciesVarietyList;
        console.log(this.state.speciesFilterList);
        console.log(speciesList);
        if(speciesList.length == 0){
            speciesList = this.state.speciesFilterList.slice();
        }
        speciesList.map(species => {
            newVarietyList = newVarietyList.concat(svlist[species]);
        });
        this.setState({varietyFilterList: newVarietyList.slice()});
        var oldFilterList = this.props.navigation.state.params && this.props.navigation.state.params.varietyFilters ? this.props.navigation.state.params.varietyFilters : [];
        // console.log(this.props.navigation.state.params.speciesFilters);
        var newFilterList = [];
        oldFilterList.map(item => {
            if(newVarietyList.indexOf(item) > 0){
                newFilterList.push(item);
            }
        });
        // this.props.navigation.setParams({varietyFilters: newFilterList.slice()});
        // console.log(newFilterList);
        return newFilterList;
    }

    filterActivityCallback(filterList){
        this.props.navigation.setParams({activityFilters: filterList.slice()});
        this.setState({menuOpen: 0});
    }

    filterSpeciesCallback(filterList){
        var newVarietyList = this.updateVarietyList(filterList);
        console.log(newVarietyList);
        this.props.navigation.setParams({
            speciesFilters: filterList.slice(),
            varietyFilters: newVarietyList.slice()
        });
        this.setState({menuOpen: 0});
    }

    filterVarietyCallback(filterList){
        this.props.navigation.setParams({varietyFilters: filterList.slice()});
        this.setState({menuOpen: 0});
    }

    cancelCallback(){
        this.setState({menuOpen: 0});
    }

    getFilter(){
        const navigate = this.props.navigation;
        var activityFilters = navigate.state.params && navigate.state.params.activityFilters ? navigate.state.params.activityFilters : [];
        var speciesFilters = navigate.state.params && navigate.state.params.speciesFilters ? navigate.state.params.speciesFilters : [];
        var varietyFilters = navigate.state.params && navigate.state.params.varietyFilters ? navigate.state.params.varietyFilters : [];
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
            return <FilterView list={this.state.varietyFilterList}
                done={this.filterVarietyCallback.bind(this)}
                cancel={this.cancelCallback.bind(this)}
                highlighted={varietyFilters} />;
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
