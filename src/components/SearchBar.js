import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    TextInput,
    Text
} from 'react-native';
import styles from '../styles/style.js';

const SearchBar = ({navigation}) => {
    return (
        <View style={{flexDirection: 'row', marginRight: 10}}>
            <TextInput
                style={{flex: 1, color: 'white'}}
                underlineColorAndroid="transparent"
                onChangeText={(keyword) => {navigation.setParams({keyword: keyword})}}
                value={navigation.state.params && navigation.state.params.keyword ? navigation.state.params.keyword : ""}
                placeholder={"Search by Plant ID..."}
                />
        </View>
    );
};

export default SearchBar;
