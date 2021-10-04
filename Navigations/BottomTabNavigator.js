import * as React from 'react';
import Cinema from '../screens/Cinema';
import News from '../screens/News';
import Gift from '../screens/Gift';
import Profile from '../screens/Profile';
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
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Cinema"
                component={Cinema}
                options={{
                    headerTitle: 'Rạp Chiếu',
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="News"
                component={News}
                options={{
                    headerTitle: 'Tin Tức',
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Gift"
                component={Gift}
                options={{
                    headerTitle: 'Quà tặng',
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: 'Cá Nhân',
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
