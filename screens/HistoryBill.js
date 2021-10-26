import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import ip from '../components/Util';

export function HistoryBill() {
    const endPoint = `http://${ip}:5000/api/bills/findBillById`;
    const [listBill, setlistBill] = useState([]);
    useEffect(() => {
        axios
            .get(endPoint)
            .then((res) => {
                setlistBill(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    return (
        <ScrollView>
            <View style={styles.container}>
                {listBill.map((bill) => {
                    let showTime = new Date(bill.showTime);
                    let showTimeStr = showTime.getFullYear() + '-' + showTime.getMonth() + '-' + showTime.getDate() + ' ' + showTime.getUTCHours() + ':' + showTime.getUTCMinutes();
                    let checkoutDate = new Date(bill.checkoutDate);
                    let checkoutDateShow = checkoutDate.getFullYear() + '-' + checkoutDate.getMonth() + '-' + checkoutDate.getDate() + ' ' + checkoutDate.getUTCHours() + ':' + checkoutDate.getUTCMinutes();
                    return (
                        <View style={styles.bill} key={bill._id}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Cinema: <Text style={{ fontStyle: 'italic', fontWeight: '100' }}>{bill.cinemaName}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Phim: <Text style={{ fontWeight: '100' }}>{bill.movieTitle}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Xuất chiếu : <Text style={{ fontWeight: '100' }}>{showTimeStr}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Ngày đặt: <Text style={{ fontWeight: '100' }}>{checkoutDateShow}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Giá vé: <Text style={{ color: 'red', fontWeight: '100' }}> {bill.price / bill.seat.length} VNĐ</Text>
                            </Text>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Image source={require('../assets/ticket.png')} style={{ width: 50, height: 50, marginRight: 20, marginLeft: 20 }}></Image>
                                <Text style={{ width: '30%', padding: 20, fontSize: 18 }}>X {bill.seat.length}</Text>
                                <Text style={{ width: '50%', padding: 20, fontSize: 18, color: 'red' }}>{bill.price} VNĐ</Text>
                            </View>

                            {/* <Text>
                        Tổng tiền: <Text>ádasds</Text>
                    </Text> */}
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bill: {
        width: '95%',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,
        borderRadius: 10,
        marginBottom: 10,
    },
});
