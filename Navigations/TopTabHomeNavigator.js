import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NowShowing from '../screens/NowShowing';
import { Home } from '../screens/Home';
import CommingSoon from '../screens/CommingSoon';
import * as React from 'react';
const Tab = createMaterialTopTabNavigator();
const TopTabDiscoverNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="NowShowing"
                component={NowShowing}
                options={{
                    tabBarLabel: 'Đang Chiếu',
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarStyle: { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="CommingSoon"
                component={CommingSoon}
                options={{
                    tabBarLabel: 'Sắp Chiếu',
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default TopTabDiscoverNavigator;
