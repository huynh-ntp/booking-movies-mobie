import React from 'react';
import { Picker, View, Text, Image, ImageBackground, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../components/Util';
import axios from 'axios';
export function Login({ navigation }) {
    const endPoint = `http://${ip}:5000/api/users`;
    const [isLogin, setLogin] = useState(true);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [errorLogin, seterrorLogin] = useState('');
    const [name, setname] = useState('');
    const [pwConfirm, setpwConfirm] = useState('');
    const [phone, setphone] = useState('');
    const [age, setage] = useState('');
    const [errRegister, seterrRegister] = useState('');
    const login = () => {
        if (username === '' || password === '') {
            seterrorLogin('Hãy nhập đầy đủ tài khoản và mật khẩu!');
        } else {
            axios
                .post(`${endPoint}/login`, {
                    userName: username,
                    password: password,
                })
                .then(async (res) => {
                    setToStorage();
                    navigation.navigate('Profile');
                })
                .catch((err) => {
                    seterrorLogin(err.response.data.message);
                });
        }
    };

    const register = () => {
        if (username.trim() === '' || name.trim() === '' || password.trim() === '' || pwConfirm.trim() === '' || phone.trim() === '' || age === '') {
            seterrRegister('Điền đầy đủ thông tin trước khi đăng ký!');
        } else {
            if (password != pwConfirm) {
                seterrRegister('Mật khẩu xác thực không trùng với mật khẩu!');
            }
        }
    };

    const setToStorage = async () => {
        try {
            await AsyncStorage.setItem('isLogin', 'true');
        } catch (err) {
            console.log(err);
        }
    };
    const yob = [];
    for (let i = 1900; i <= 2021; i++) {
        yob.push(i);
    }
    if (isLogin) {
        return (
            <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
                <ImageBackground style={styles.imgBg} source={require('../assets/bgLogin.jpg')}></ImageBackground>
                <View style={styles.bottomView}>
                    <View style={{ padding: 40 }}>
                        <Text style={{ color: '#FFAF42', fontSize: 34 }}>Welcome</Text>
                        <Text>
                            Chưa có tài khoản?
                            <TouchableOpacity
                                onPress={() => {
                                    setLogin(false);
                                }}
                            >
                                <Text style={{ color: 'red', fontStyle: 'italic' }}> {'  '}Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{ marginTop: -10 }}>
                        <Text style={{ alignItems: 'flex-end', marginLeft: '10%' }}>Username:</Text>
                        <TextInput value={username} onChangeText={(value) => setusername(value)} mode="outlined" label="Username" style={{ width: '80%', marginLeft: '10%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                        <Text style={{ alignItems: 'flex-end', marginLeft: '10%' }}>Password:</Text>
                        <TextInput value={password} onChangeText={(value) => setpassword(value)} mode="outlined" label="Password" secureTextEntry={true} style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                        <Text style={{ color: 'red', marginLeft: '10%' }}>{errorLogin}</Text>
                    </View>
                    <Button onPress={() => login()} style={{ marginBottom: 140, marginTop: 10, width: 130, marginLeft: '55%' }} mode="contained">
                        Đăng nhập
                    </Button>
                </View>
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
                <ImageBackground style={styles.imgBg} source={require('../assets/bgLogin.jpg')}></ImageBackground>
                <View style={styles.bottomView}>
                    <View style={{ padding: 40 }}>
                        <Text style={{ color: '#FFAF42', fontSize: 34 }}>Welcome</Text>
                        <Text>
                            Đã có tài khoản?
                            <TouchableOpacity
                                onPress={() => {
                                    setLogin(true);
                                }}
                            >
                                <Text style={{ color: 'red', fontStyle: 'italic' }}> {'  '}Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <View style={{ marginTop: -30 }}>
                        <Text style={{ marginLeft: '10%' }}>Name:</Text>
                        <TextInput value={name} onChangeText={(value) => setname(value)} mode="outlined" label="Name" style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 40 }}></TextInput>
                        <Text style={{ marginLeft: '10%' }}>Username:</Text>
                        <TextInput value={username} onChangeText={(value) => setusername(value)} mode="outlined" label="Username" style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 40 }}></TextInput>
                        <Text style={{ marginLeft: '10%' }}>Password:</Text>
                        <TextInput value={password} onChangeText={(value) => setpassword(value)} mode="outlined" label="Password" secureTextEntry={true} style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 40 }}></TextInput>
                        <Text style={{ marginLeft: '10%' }}>Confirm pass:</Text>
                        <TextInput value={pwConfirm} onChangeText={(value) => setpwConfirm(value)} mode="outlined" label="Confirm password" secureTextEntry={true} style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 40 }}></TextInput>
                        <Text style={{ marginLeft: '10%' }}>Phone:</Text>
                        <TextInput value={phone} mode="outlined" label="Phone" style={{ marginLeft: '10%', width: '80%', backgroundColor: '#FFF', height: 40 }}></TextInput>
                        <Text style={{ marginLeft: '10%' }}>Yob:</Text>
                        <Picker style={{ width: '40%', marginLeft: '10%' }}>
                            {yob.map((y) => (
                                <Picker.Item key={y} label={`${y}`} value={y}></Picker.Item>
                            ))}
                        </Picker>
                        <Text style={{ color: 'red', marginLeft: '10%' }}>{errRegister}</Text>
                    </View>
                    <Button onPress={() => register()} style={{ marginBottom: 140, marginTop: 10, width: 130, marginLeft: '55%' }} mode="contained">
                        Đăng ký
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imgBg: {
        height: Dimensions.get('window').height / 2.5,
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: '#FFF',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
});
