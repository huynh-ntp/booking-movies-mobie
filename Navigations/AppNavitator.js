import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import { Login } from '../screens/Login';
import Film from './Film';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" options={{ headerShown: false }} component={BottomTabNavigator}></Stack.Screen>
            <Stack.Screen name="Film" component={Film}></Stack.Screen>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppNavigator;
