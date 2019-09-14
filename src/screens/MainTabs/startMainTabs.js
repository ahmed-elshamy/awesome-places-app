import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {

    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
        ,Icon.getImageSource("ios-menu", 30)
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
                                                            icon: sources[0]
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Find Place'
                                                            }
                                                            ,leftButtons: [
                                                                {
                                                                    icon: sources[2],
                                                                    text: 'Menu',
                                                                    id: 'sideDrawerToggle'
                                                                }
                                                            ]
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
                                                            icon: sources[1]
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Share Place'
                                                            }
                                                            ,leftButtons: [
                                                                {
                                                                    icon: sources[2],
                                                                    text: 'Menu',
                                                                    id: 'sideDrawerToggle'
                                                                }
                                                            ]
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