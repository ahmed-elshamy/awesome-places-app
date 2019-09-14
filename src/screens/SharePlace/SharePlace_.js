import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component{
    // static options(passProps) {
    //     return {
    //         topBar: {
    //             leftButtons: {
    //                 icon: Icon.getImageSource("ios-menu", 30),
    //                 text: 'Menu',
    //                 id: 'sideDrawerToggle'
    //             }
    //         }
    //     };
    // }

    constructor(props){
        super(props);
        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        Navigation.events().bindComponent(this);
        this.isSideDrawerVisible = false;
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "sideDrawerToggle") {
            Navigation.mergeOptions("side-menu", {
                sideMenu: {
                    left: {
                        visible: true,
                    },
                },
            });
        }
    }

    // navigationButtonPressed({ buttonId }) {
    //     if (buttonId === "sideDrawerToggle") {
    //         (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
    //         Navigation.mergeOptions(this.props.componentId, {
    //             sideMenu: {
    //                 left: {
    //                     visible: this.isSideDrawerVisible,
    //                 }
    //             }
    //         });
    //     }
    // }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress"){
            if (event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render(){
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);