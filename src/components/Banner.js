import React, { Component } from 'react';
import ToolbarAndroid from 'ToolbarAndroid';
import Drawer from 'react-native-drawer';
import Menu from './Menu.js';
import {
    Text
} from 'react-native';

var banner = class Banner extends Component {
   render() {
       return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu styleMenu={this.props.styleMenu} />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panOpenMask={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2}
                })}>
               <ToolbarAndroid
                   navIcon = {require('../img/menuIcon.png')}
                   onIconClicked = {() => {this._drawer.open()}}
                   title = "Date Placeholder"
                   style = {this.props.styleToolbar}
                   titleColor = 'white'
               />
           </Drawer>
       );
   }
}

export default banner;