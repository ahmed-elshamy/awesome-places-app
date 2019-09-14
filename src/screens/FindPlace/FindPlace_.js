import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// import PropTypes from 'prop-types';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component{
    // static propTypes = {
    //     componentId: PropTypes.string
    // };

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

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        // this.props.navigator.push({
        //     screen: "awesome-places.PlaceDetailScreen",
        //     title: selPlace.name,
        //     passProps: {
        //         selectedPlace: selPlace
        //     }
        // });
        Navigation.push(this.props.componentId, {
            component: {
                name: 'awesome-places.PlaceDetailScreen',
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name
                        }
                    }
                }
            }
        });
    }

    render(){
        return (
            <View>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

export default connect(mapStateToProps)(FindPlaceScreen);