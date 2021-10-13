import * as React from 'react';
import FilmDetail from '../screens/FilmDetail';
import Shows from '../screens/Shows';
import Review from '../screens/Review';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Film = ({ navigation, route }) => {
    const { film } = route.params;
    return (
        <Tab.Navigator initialRouteName="Shows">
            <Tab.Screen
                name="Shows"
                initialParams={film}
                component={Shows}
                options={{
                    tabBarLabel: 'Lịch Chiếu',
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Review"
                initialParams={film}
                component={Review}
                options={{
                    tabBarLabel: 'Bình Luận',
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarStyle: { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="FilmDetail"
                component={FilmDetail}
                initialParams={film}
                options={{
                    tabBarLabel: 'Thông tin',
                    // tabBarShowLabel:false,
                    tabBarActiveTintColor: '#e91e63',
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarStyle: { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default Film;
