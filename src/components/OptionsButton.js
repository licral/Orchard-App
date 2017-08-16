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
import styles from '../styles/style.js';
import {
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native';

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

const ActivityFilter = (
    <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Icon name="close" style={[styles.modalIcon, {color: '#fe4a49'}]} />
            <View style={{flex: 1}}></View>
            <Icon name="done" style={[styles.modalIcon, {color: '#43a047'}]} />
        </View>
        <View style={{padding: 22}}>
            <Text>Filter by activity type</Text>
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
            menuOpen: 0
        };
    }

    getFilter(){
        if(this.state.menuOpen == 1){
            return Sort;
        } else if(this.state.menuOpen == 2){
            return ActivityFilter;
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
                        <TouchableWithoutFeedback onPress={() => {}}>
                            {filter}
                        </TouchableWithoutFeedback>
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default OptionsButton;
