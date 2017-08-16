import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';

const SearchButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.setParams({search: false, keyword: "", activityFilters: []})}>
        <Icon name="arrow-back" style={styles.headerLeftIcon} />
    </TouchableOpacity>
);

export default SearchButton;
