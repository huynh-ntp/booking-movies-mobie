import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ip from '../components/Util';
export function Profile({ navigation }) {
    const [isLogin, setisLogin] = useState(AsyncStorage.getItem('isLogin'));
    const endPoint = `http://${ip}:5000/api/users`;
    const isForcused = useIsFocused();

    useEffect(() => {
        checkLogin();
    }, [isForcused]);

    const checkLogin = async () => {
        var login = await AsyncStorage.getItem('isLogin');
        console.log(login);
        if ((login !== null) & (login === 'true')) {
            setisLogin(true);
            axios
                .get(`${endPoint}/me`)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setisLogin(false);
        }
    };

    const goToLoginScreen = () => {
        navigation.navigate('Login');
    };

    const logout = async () => {
        axios
            .get(`${endPoint}/logout`)
            .then((res) => {
                AsyncStorage.setItem('isLogin', 'false');
                setisLogin(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!isLogin) {
        return (
            <SafeAreaView>
                <Text>Profile</Text>
                <Button
                    onPress={() => {
                        goToLoginScreen();
                    }}
                    title="Login"
                ></Button>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
                <Text>Profile after login</Text>
                <Button
                    onPress={() => {
                        logout();
                    }}
                    title="Logout"
                ></Button>
            </SafeAreaView>
        );
    }
}
