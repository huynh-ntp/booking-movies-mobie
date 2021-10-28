import * as React from 'react';
import { Image } from 'react-native';
import Cinema from '../screens/Cinema';
import News from '../screens/News';
import Gift from '../screens/Gift';
import { Profile } from '../screens/Profile';
import TopTabDiscoverNavigator from './TopTabHomeNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Discover"
                component={TopTabDiscoverNavigator}
                options={{
                    headerTitle: 'Khám Phá',
                    tabBarActiveTintColor: '#e91e63',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/discover.png')}
                            style={{
                                marginTop: 5,
                                height: 25,
                                width: 25,
                            }}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Cinema"
                component={Cinema}
                options={{
                    headerTitle: 'Rạp Chiếu',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/cinema.png')}
                            style={{
                                marginTop: 5,
                                height: 25,
                                width: 25,
                            }}
                        />
                    ),
                }}
            ></Tab.Screen>
            {/* <Tab.Screen
                name="News"
                component={News}
                options={{
                    tabBarActiveTintColor: '#e91e63',
                    headerTitle: 'Tin Tức',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/news.png')}
                            style={{
                                marginTop: 5,
                                height: 25,
                                width: 25,
                            }}
                        />
                    ),
                }}
            ></Tab.Screen> */}
            <Tab.Screen
                name="Gift"
                component={Gift}
                options={{
                    headerTitle: 'Quà tặng',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/gift.png')}
                            style={{
                                marginTop: 5,
                                height: 25,
                                width: 25,
                            }}
                        />
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: 'Cá Nhân',
                    tabBarActiveTintColor: '#e91e63',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/user.png')}
                            style={{
                                marginTop: 5,
                                height: 25,
                                width: 25,
                            }}
                        />
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
