import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import { Login } from '../screens/Login';
import { ShowDetail } from '../screens/ShowDetail';
import { Payment } from '../screens/Payment';
import { PaymentSuccess } from '../screens/PaymentSuccess';
import Film from './Film';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" options={{ headerShown: false }} component={BottomTabNavigator}></Stack.Screen>
            <Stack.Screen name="Film" component={Film}></Stack.Screen>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login}></Stack.Screen>
            <Stack.Screen name="ShowDetail" component={ShowDetail}></Stack.Screen>
            <Stack.Screen name="Payment" options={{ headerTitle: 'Xác nhận đơn hàng' }} component={Payment}></Stack.Screen>
            <Stack.Screen name="PaymentSuccess" options={{ headerShown: false }} component={PaymentSuccess}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppNavigator;
