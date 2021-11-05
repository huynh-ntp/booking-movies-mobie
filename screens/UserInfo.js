import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import ip from '../components/Util';

export function UserInfo({ navigation, route }) {
    const { account } = route.params;
    const endPoint = `http://${ip}:5000/api/users/update`;
    const [name, setname] = useState(account.fullName);
    const [phone, setphone] = useState(account.phone);
    const [age, setage] = useState(account.age);
    const [nameErr, setnameErr] = useState('');
    const [phoneErr, setphoneErr] = useState('');
    const [ageErr, setageErr] = useState('');
    const update = () => {
        if (nameErr === '' && phoneErr === '' && ageErr === '') {
            if (isNaN(phone)) {
                setphoneErr('Số điện thoại không hợp lệ.');
                return;
            }
            if (age < 15 || age > 100) {
                setageErr('Tuổi phải từ 14 đến 100');
                return;
            }
            axios
                .post(endPoint, {
                    fullName: name,
                    age: age,
                    phone: phone,
                })
                .then((res) => {
                    Alert.alert('Cập nhật thành công');
                })
                .catch((err) => {
                    console.log(err.response.data);
                    Alert.alert('Cập nhật thất bại !');
                });
        }
    };
    const changeName = (value) => {
        if (value.trim().length > 0) {
            setnameErr('');
            setname(value);
        } else {
            setname('');
            setnameErr('Tên không được để trống');
        }
    };
    const changePhone = (value) => {
        if (value.length > 0) {
            setphoneErr('');
            setphone(value);
        } else {
            setphone('');
            setphoneErr('Số điện thoại không được để trống');
        }
    };
    const changeAge = (value) => {
        if (value.length > 0) {
            if (!isNaN(value)) {
                setageErr('');
                setage(value);
            } else {
                setage('');
                setageErr('Tuổi là phải là số ');
            }
        } else {
            setage('');
            setageErr('Tuổi không được để trống');
        }
    };

    return (
        <View style={styles.container}>
            <Image style={{ width: 100, height: 100, marginTop: -70, marginBottom: 20, borderRadius: 60 }} source={require('../assets/avt.png')}></Image>
            <View style={styles.boxInfo}>
                <View style={styles.input}>
                    <Text style={{ width: '15%' }}>Id:</Text>
                    <Text style={{ width: '85%' }}>{account._id}</Text>
                </View>
                <Text style={{ color: 'red' }}></Text>
                <View style={styles.input}>
                    <Text style={{ width: '25%' }}>Tình trạng:</Text>
                    <Text style={{ width: '75%' }}>{account.status === true ? 'Bình thường' : 'Khóa'}</Text>
                </View>
                <Text style={{ color: 'red' }}></Text>
                <View style={styles.input}>
                    <Text style={{ width: '15%' }}>Tên:</Text>
                    <TextInput value={name} onChangeText={(value) => changeName(value)} style={{ width: '85%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{nameErr}</Text>
                <View style={styles.input}>
                    <Text style={{ width: '15%' }}>Sđt:</Text>
                    <TextInput value={phone} onChangeText={(value) => changePhone(value.trim())} style={{ width: '85%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{phoneErr}</Text>
                <View style={styles.input}>
                    <Text style={{ width: '15%' }}>Tuổi:</Text>
                    <TextInput value={`${age}`} onChangeText={(value) => changeAge(value.trim())} style={{ width: '85%' }}></TextInput>
                </View>
                <Text style={{ color: 'red' }}>{ageErr}</Text>
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
        paddingHorizontal: 30,
        backgroundColor: 'tomato',
        borderRadius: 20,
        color: '#FFF',
    },
});
