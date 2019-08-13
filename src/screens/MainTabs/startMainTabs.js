import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    // Navigation.startTabBasedApp({
    //     tabs: [
    //         {
    //             screen: "awesome-places.FindPlaceScreen",
    //             label: "Find Place",
    //             title: "Find Place"
    //         },
    //         {
    //             screen: "awesome-places.SharePlaceScreen",
    //             label: "Share Place",
    //             title: "Share Place"
    //         }
    //     ]
    // });

    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
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
                                                }
                                            }
                                        },
                                    },
                                ],
                            }
                        }
                    ]
                }
            }
        });
    });
};

export default startTabs;