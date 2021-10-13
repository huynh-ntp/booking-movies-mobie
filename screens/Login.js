import React from 'react';
import { SafeAreaView, View, Text, Image, ImageBackground, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
export function Login() {
    const loginForm = () => (
        <View>
            <View style={{ marginTop: -10, alignItems: 'center' }}>
                <TextInput mode="outlined" label="Username" style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                <TextInput mode="outlined" label="Password" secureTextEntry={true} style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
            </View>
            <Button onPress={() => console.log('Ok')} style={{ marginBottom: 140, marginTop: 10, width: 130, marginLeft: '55%' }} mode="contained">
                Đăng nhập
            </Button>
        </View>
    );
    const registerForm = () => (
        <View>
            <View style={{ marginTop: -10, alignItems: 'center' }}>
                <TextInput mode="outlined" label="Full name" style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                <TextInput mode="outlined" label="Username" style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                <TextInput mode="outlined" label="Password" secureTextEntry={true} style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
                <TextInput mode="outlined" label="Confirm Password" secureTextEntry={true} style={{ width: '80%', backgroundColor: '#FFF', height: 50 }}></TextInput>
            </View>
            {/* <TouchableOpacity>
                <Text style={styles.button}>Đăng ký</Text>
            </TouchableOpacity> */}
            <Button onPress={() => console.log('Ok')} style={{ marginBottom: 140, marginTop: 10, width: 130, marginLeft: '55%' }} mode="contained">
                Đăng ký
            </Button>
        </View>
    );
    const [formShow, setFormShow] = useState(loginForm);
    const [isLogin, setLogin] = useState(true);

    return (
        <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
            <ImageBackground style={styles.imgBg} source={require('../assets/bgLogin.jpg')}></ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#FFAF42', fontSize: 34 }}>Welcome</Text>
                    {isLogin ? (
                        <Text>
                            Chưa có tài khoản?
                            <TouchableOpacity
                                onPress={() => {
                                    setFormShow(registerForm);
                                    setLogin(false);
                                }}
                            >
                                <Text style={{ color: 'red', fontStyle: 'italic' }}> {'  '}Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </Text>
                    ) : (
                        <Text>
                            Đã có tài khoản?
                            <TouchableOpacity
                                onPress={() => {
                                    setFormShow(loginForm);
                                    setLogin(true);
                                }}
                            >
                                <Text style={{ color: 'red', fontStyle: 'italic' }}> {'  '}Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </Text>
                    )}
                </View>
                {formShow}
            </View>
        </ScrollView>
    );
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
    //     button: {
    //         backgroundColor: '#FFAF42',
    //         width: 100,
    //         paddingVertical: 5,
    //         paddingHorizontal: 20,
    //     },
});
