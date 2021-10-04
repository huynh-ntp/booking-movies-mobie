import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" options={{ headerShown: false }} component={BottomTabNavigator}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppNavigator;
