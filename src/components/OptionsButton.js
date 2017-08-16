import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuContext,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import styles from '../styles/style.js';
import {
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native';

const {SlideInMenu} = renderers;

class OptionsButton extends Component{
    constructor(){
        super();
        this.state = {
            menuOpen: false
        };
    }

    openMenu(value){
        if(value == 1) {
            this.setState({menuOpen: true});
        }
    }

    render(){
        return(
            <View>
                <Menu name="filterMenu" onSelect={value => this.openMenu(value)}>
                    <MenuTrigger>
                        <Icon name="more-vert" style={styles.headerRightIcon} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value={1} text='Test1' />
                    </MenuOptions>
                </Menu>
                <TouchableWithoutFeedback onPress={() => {this.setState({menuOpen: false})}}>
                    <Modal isVisible={this.state.menuOpen} style={{justifyContent: 'flex-end', margin: 0}}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={{backgroundColor: 'white', padding: 22, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>This is a modal!</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default OptionsButton;
