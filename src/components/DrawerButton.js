import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu" style={styles.headerLeftIcon} />
    </TouchableOpacity>
);

DrawerButton.propTypes = {
    navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton;