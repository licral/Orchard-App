import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from '../styles/style.js';
import {
    Text,
    View
} from 'react-native';

var calendarView = class CalendarView extends Component {
   render() {
       return(
           <View style={styles.pageContent}>
               <Text>There should be a new button below</Text>
               <ActionButton buttonColor="rgba(255,0,0,1)">
                    <ActionButton.Item buttonColor="#ff0000" title="Open Camera" onPress={() => {}}>
                        <Icon name="add" style={styles.newButton} />
                    </ActionButton.Item>
               </ActionButton>
           </View>
       );
   }
}

export default calendarView;