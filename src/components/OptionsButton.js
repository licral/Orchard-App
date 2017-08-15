import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuContext,
    MenuTrigger,
    View
} from 'react-native-popup-menu';
import {
    TouchableOpacity
} from 'react-native';

const OptionsButton = ({ navigation }) => (
    <Menu name="filterMenu">
        <MenuTrigger>
            <Icon name="more-vert" style={styles.headerRightIcon} />
        </MenuTrigger>
        <MenuOptions>
            <MenuOption text='Test1' />
        </MenuOptions>
    </Menu>
);

export default OptionsButton;
