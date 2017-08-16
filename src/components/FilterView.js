import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style.js';
import {
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback
} from 'react-native';

var FilterView = class FilterView extends Component{
    constructor(){
        super();
        this.state = {
            highlighted : []
        }
    }

    _toggleHighlight(item){
        var list = this.state.highlighted;
        var index = list.indexOf(item);
        if(index < 0){
            list.push(item);
        } else {
            list.splice(index, 1);
        }
        this.setState({highlighted: list});
    }

    processList(){
        var itemList = this.props.list;
        var pickers = [];
        var _this = this;
        Object.keys(itemList).map(function(key){
            var index = _this.state.highlighted.indexOf(itemList[key]);
            const background = {backgroundColor: index < 0 ? 'white' : '#43a047'};
            const textStyle = {color: index < 0 ? 'black' : 'white'};
            pickers.push(
                <TouchableNativeFeedback onPress={_this._toggleHighlight.bind(_this, itemList[key])}>
                    <View style={[background, {padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#43a047', margin: 5}]}>
                        <Text style={[textStyle, {fontSize: 16}]}>{itemList[key]}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        });
        return pickers;
    }

    render(){
        var filterList = this.processList();
        return(
            <TouchableWithoutFeedback onPress={() => {}}>
                <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableNativeFeedback onPress={() => this.props.cancel()}>
                        <View>
                            <Icon name="close" style={[styles.modalIcon, {color: '#fe4a49'}]} />
                        </View>
                        </TouchableNativeFeedback>
                        <View style={{flex: 1}}></View>
                        <TouchableNativeFeedback onPress={() => this.props.done(this.state.highlighted)}>
                            <View>
                                <Icon name="done" style={[styles.modalIcon, {color: '#43a047'}]} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{padding: 10}}>
                        {filterList}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default FilterView;
