import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';

const SearchButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.setParams({search: true})}>
        <Icon name="search" style={styles.headerRightIcon} />
    </TouchableOpacity>
);

export default SearchButton;
