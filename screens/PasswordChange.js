import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import ip from '../components/Util';

export function PasswordChange() {
    const endPoint = `http://${ip}:5000/api/users/update-password`;
    const [oldPass, setoldPass] = useState('');
    const [newPass, setnewPass] = useState('');
    const [confirm, setconfirm] = useState('');
    const [oldPassErr, setoldPassErr] = useState('');
    const [newPassErr, setnewPassErr] = useState('');
    const [confirmErr, setconfirmErr] = useState('');
    const update = () => {
        if (oldPass === '' && newPass === '' && confirm === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin trước khi đổi mật khẩu!');
            return;
        }
        if (oldPassErr === '' && newPassErr === '' && confirmErr === '') {
            axios
                .post(endPoint, {
                    password_current: oldPass,
                    password: newPass,
                })
                .then((res) => {
                    Alert.alert('Đổi mật khẩu thành công!');
                })
                .catch((err) => {
                    setoldPassErr(err.response.data.message);
                });
        }
    };
    const changePassword = (value) => {
        if (value.length === 0) {
            setoldPassErr('Mật khẩu cũ không được để trống');
        } else {
            setoldPassErr('');
            setoldPass(value);
        }
    };
    const changeNewPass = (value) => {
        if (value.length === 0) {
            setnewPassErr('Mật khẩu mới không được để trống');
        } else {
            setnewPassErr('');
            setnewPass(value);
        }
    };
    const changeConfirm = (value) => {
        if (value.length === 0) {
            setconfirmErr('Mật khẩu xác nhận không được để trống');
        } else if (newPass !== value) {
            setconfirmErr('Mật khẩu xác nhận không trùng mật khẩu mới');
        } else {
            setconfirmErr('');
            setconfirm(value);
        }
    };
    return (
        <View style={styles.container}>
            <Image style={{ width: 100, height: 100, marginTop: -100, marginBottom: 20, borderRadius: 60 }} source={require('../assets/password.png')}></Image>
            <View style={styles.boxInfo}>
                <View style={styles.input}>
                    <Text style={{ width: '40%' }}>Mật khẩu:</Text>
                    <TextInput onChangeText={(value) => changePassword(value.trim())} secureTextEntry={true} style={{ width: '60%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{oldPassErr}</Text>
                <View style={styles.input}>
                    <Text style={{ width: '40%' }}>Mật khẩu mới:</Text>
                    <TextInput onChangeText={(value) => changeNewPass(value.trim())} secureTextEntry={true} style={{ width: '60%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{newPassErr}</Text>
                <View style={styles.input}>
                    <Text style={{ width: '50%' }}>Xác nhận mật khẩu:</Text>
                    <TextInput onChangeText={(value) => changeConfirm(value.trim())} secureTextEntry={true} style={{ width: '60%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{confirmErr}</Text>
                <TouchableOpacity onPress={() => update()}>
                    <Text style={styles.button}>Cập nhât</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxInfo: {
        padding: 20,
        paddingVertical: 50,
        backgroundColor: '#FFF',
        width: '95%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        padding: 10,
        width: '95%',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        borderRadius: 20,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: 'tomato',
        borderRadius: 20,
        color: '#FFF',
    },
});
