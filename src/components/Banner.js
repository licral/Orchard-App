import React, { Component } from 'react';
import ToolbarAndroid from 'ToolbarAndroid';

var banner = class Banner extends Component {
   render() {
       return(
           <ToolbarAndroid
               navIcon = {require('../img/menuIcon.png')}
               title = "Date Placeholder"
               style = {this.props.style}
               titleColor = 'white'
           />
       );
   }
}

export default banner;