import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {

    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30)
        ,Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {

        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'awesome-places.SideDrawer',
                            id: 'side-menu'
                        },
                    },
                    center: {
                        id: 'MY_STACK',
                        bottomTabs: {
                            children: [
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'awesome-places.FindPlaceScreen',
                                                    options: {
                                                        bottomTab: {
                                                            // fontSize: 12,
                                                            text: 'Find Place',
                                                            icon: sources[0],
                                                            iconColor: 'orange',
                                                            selectedIconColor: 'orange',
                                                            textColor: 'orange',
                                                            selectedTextColor: 'orange'
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Find Place'
                                                                // ,color: "orange"
                                                            }
                                                            ,leftButtons: [
                                                                {
                                                                    icon: sources[2],
                                                                    color: "orange",
                                                                    text: 'Menu',
                                                                    id: 'sideDrawerToggle'
                                                                }
                                                            ]
                                                            // ,background: {
                                                            //     color: "orange"
                                                            // }
                                                        }
                                                    }
                                                },
                                            },
                                        ],
                                    }
                                },
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'awesome-places.SharePlaceScreen',
                                                    options: {
                                                        bottomTab: {
                                                            text: 'Share Place',
                                                            // fontSize: 12,
                                                            icon: sources[1],
                                                            iconColor: 'orange',
                                                            selectedIconColor: 'orange',
                                                            textColor: 'orange',
                                                            selectedTextColor: 'orange'
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Share Place'
                                                                // ,color: "orange"
                                                            }
                                                            ,leftButtons: [
                                                                {
                                                                    icon: sources[2],
                                                                    color: "orange",
                                                                    text: 'Menu',
                                                                    id: 'sideDrawerToggle'
                                                                }
                                                            ]
                                                            // ,background: {
                                                            //     color: "orange"
                                                            // }
                                                        }
                                                    }
                                                },
                                            },
                                        ],
                                    }
                                }
                            ]
                        }
                    },
                },
            },
        });

    });

};

export default startTabs;