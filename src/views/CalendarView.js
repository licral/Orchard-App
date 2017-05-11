import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var calendarView = class CalendarView extends Component {
   render() {
        const {navigate} = this.props.navigation;
       return(
           <View style={styles.pageContent}>
               <Text>This is going to show a calender view of the activity history</Text>
               <ActionButton buttonColor="rgba(255,0,0,1)">
                    <ActionButton.Item
                        buttonColor="#ff0000"
                        title="Record New Activity"
                        onPress={() => {navigate('Barcode')}}>
                        <Icon name="create" style={styles.newButton} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#ff0000"
                        title="Register New Plant"
                        onPress={() => {navigate('Barcode')}}>
                        <Icon name="local-florist" style={styles.newButton} />
                    </ActionButton.Item>
               </ActionButton>
           </View>
       );
   }
}

export default calendarView;