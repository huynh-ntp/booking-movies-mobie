import React from 'react';
import { SafeAreaView, Text, View, Alert, Image, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ip from '../components/Util';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function ShowDetail({ navigation, route }) {
    const { film } = route.params;
    const { show } = route.params;
    const { cinemaChoose } = route.params;
    const seatList = show.seats;
    const [seats, setseats] = useState(seatList);
    const [seatChoose, setseatsChoose] = useState([]);
    const [isLogin, setisLogin] = useState('');
    const endPoint = `http://${ip}:5000/api/users`;
    useEffect(() => {
        setseats(show.seats);
        checkLogin();
    }, []);
    const checkLogin = async () => {
        var login = await AsyncStorage.getItem('isLogin');
        setisLogin(login);
    };
    const select = (index) => {
        setseatsChoose((prevState) => {
            prevState.push(index);
            return [...prevState];
        });
        setseats((prevState) => {
            prevState[index - 1].status = true;
            return [...prevState];
        });
    };
    const removeSelected = (index) => {
        setseatsChoose((prevState) => {
            for (var i = 0; i < prevState.length; i++) {
                if (prevState[i] === index) {
                    prevState.splice(i, 1);
                }
            }
            return [...prevState];
        });
        setseats((prevState) => {
            prevState[index - 1].status = false;
            return [...prevState];
        });
    };
    const renderItem = ({ item }) => {
        if (!item.status && !seatChoose.includes(item.id)) {
            return (
                <TouchableOpacity onPress={() => select(item.id)} style={styles.notSelect}>
                    <Text>{item.id}</Text>
                </TouchableOpacity>
            );
        } else if (item.status && seatChoose.includes(item.id)) {
            return (
                <TouchableOpacity onPress={() => removeSelected(item.id)} style={styles.selectedNow}>
                    <Text>{item.id}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.selected}>
                <Text>{item.id}</Text>
            </View>
        );
    };
    const gotoPayment = () => {
        if (isLogin === 'false') {
            Alert.alert('Bạn cần đăng nhập để đặt phim');
            return;
        } else {
            axios
                .get(`${endPoint}/me`)
                .then((res) => {
                    if (res.data.status === false) {
                        Alert.alert('Tài khoản của bạn đã bị khóa! Liên hệ 1900545436!');
                        return;
                    }
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }
        if (seatChoose.length === 0) {
            Alert.alert('Vui lòng chọn ghế trước khi đặt vé!');
        } else {
            //   console.log(film);
            navigation.navigate('Payment', {
                seatChoose: seatChoose,
                film: film,
                cinemaChoose: cinemaChoose,
                show: show,
            });
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.screenHere}>Màn hình ở đây</Text>
            <FlatList extraData={seats} data={seats} style={{ marginTop: 20 }} renderItem={renderItem} numColumns={4} />
            <View style={styles.note}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginTop: 5, marginRight: 40, width: '50%', color: '#FFF' }}>Ghế đã được chọn</Text>
                    <View style={{ backgroundColor: 'red', width: 80, height: 30 }}></View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ marginTop: 5, marginRight: 40, width: '50%', color: '#FFF' }}>Ghế đang chọn</Text>
                    <View style={{ backgroundColor: 'green', width: 80, height: 30 }}></View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ marginTop: 5, marginRight: 40, width: '50%', color: '#FFF' }}>Ghế trống</Text>
                    <View style={{ backgroundColor: '#FFF', width: 80, height: 30 }}></View>
                </View>
            </View>
            <TouchableOpacity onPress={() => gotoPayment()} style={styles.button}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Đặt vé</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //    backgroundColor: 'green',
    },
    screenHere: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#FFF',
        paddingHorizontal: 120,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
    },
    notSelect: {
        backgroundColor: '#FFF',
        width: '24%',
        height: 50,
        marginLeft: '1%',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
    },
    selected: {
        backgroundColor: 'red',
        width: '24%',
        height: 50,
        marginLeft: '1%',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
    selectedNow: {
        backgroundColor: 'green',
        width: '24%',
        height: 50,
        marginLeft: '1%',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
    note: {
        width: '90%',
        padding: 10,
        backgroundColor: 'gray',
        height: 'auto',
        bottom: 110,
        alignItems: 'center',
    },
    button: {
        bottom: 80,
        padding: 10,
        backgroundColor: 'tomato',
        paddingHorizontal: 25,
        borderRadius: 15,
        color: '#FFF',
    },
});
