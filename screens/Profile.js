import { useIsFocused } from '@react-navigation/core';
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ip from '../components/Util';
export function Profile({ navigation }) {
    const [isLogin, setisLogin] = useState(AsyncStorage.getItem('isLogin'));
    const endPoint = `http://${ip}:5000/api/users`;
    const isForcused = useIsFocused();
    const [account, setaccount] = useState('');
    useEffect(() => {
        checkLogin();
        axios
            .get(`${endPoint}/me`)
            .then((res) => {
                setaccount(res.data);
                console.log(account);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
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
            <View style={styles.container}>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../assets/avt.png')}></Image>
                    <Text style={{ marginTop: 10, fontSize: 18, color: 'tomato' }}>Welcome {account.fullName}</Text>
                </View>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 50 }}></View>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() =>
                        navigation.navigate('UserInfo', {
                            account: account,
                        })
                    }
                >
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/info.jpg')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Thông tin cá nhân</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('PasswordChange')}>
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/password.png')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('HistoryBill')}>
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/ticket.png')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Vé đã đặt</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/hotline.jpg')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Hotline: 1900545436</Text>
                </View>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/facebook.png')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Theo dõi chúng tôi trên facebook</Text>
                </View>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 30, height: 30, marginTop: 10, marginLeft: 20 }} source={require('../assets/insurance.png')}></Image>
                    <Text style={{ paddingVertical: 12, marginLeft: 10, fontSize: 18 }}>Chính sách bảo mật</Text>
                </View>
                <View style={{ backgroundColor: '#000', height: 1, marginTop: 5 }}></View>

                <Button
                    onPress={() => {
                        logout();
                    }}
                    title="Logout"
                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});
