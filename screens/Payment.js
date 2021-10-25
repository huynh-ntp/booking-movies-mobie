import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import ip from '../components/Util';
import axios from 'axios';
export function Payment({ navigation, route }) {
    const { seatChoose } = route.params;
    const { film } = route.params;
    const { cinemaChoose } = route.params;
    const { show } = route.params;
    const endPoint = `http://${ip}:5000/api/rooms/${show.rooms}`;
    const [room, setroom] = useState('');
    const [startDate, setstartDate] = useState(new Date(show.startDate));
    const [endDate, setendDate] = useState(new Date(show.endDate));
    useEffect(() => {
        axios
            .get(endPoint)
            .then((res) => {
                setroom(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const payment = () => {
        let billEndpoint = `http:${ip}:5000/api/bills`;
        axios
            .post(billEndpoint, {
                cinemaName: cinemaChoose.cinemaName,
                movieTitle: film.title,
                seat: seatChoose,
                room: room.nameRoom,
                showTimeId: show._id,
                price: show.price,
                showTime: show.startDate,
            })
            .then((res) => {
                navigation.navigate('PaymentSuccess');
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.paymentInfo}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Thông tin đơn hàng</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Rạp:
                        <Text style={{ fontWeight: '100' }}> {cinemaChoose.cinemaName}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Địa chỉ:
                        <Text style={{ fontWeight: '100' }}> {cinemaChoose.cinemaAddress}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Room:
                        <Text style={{ fontWeight: '100' }}> {room.nameRoom}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Phim:
                        <Text style={{ fontWeight: '100' }}> {film.title}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Ngày:
                        <Text style={{ fontWeight: '100' }}> {startDate.getDate() + '-' + startDate.getMonth() + '-' + startDate.getFullYear()}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Giờ:
                        <Text style={{ fontWeight: '100' }}> {startDate.getUTCHours() + ':' + startDate.getUTCMinutes() + ' to ' + endDate.getUTCHours() + ':' + endDate.getUTCMinutes()}</Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Tổng tiền:
                        <Text style={{ fontWeight: '100' }}>
                            <Text style={{ color: 'red' }}> {show.price * seatChoose.length} đ</Text>
                        </Text>
                    </Text>
                </View>
                {seatChoose.map((s) => (
                    <View style={styles.ticket} key={s}>
                        <Image style={{ width: 40, height: 40 }} source={{ uri: film.movieImg }}></Image>
                        <Text style={{ color: 'red', marginTop: 10, marginLeft: 40 }}>{`Giá ${show.price} đ`}</Text>
                        <Text style={{ marginTop: 10, marginLeft: 40 }}>Seat:{s}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => payment()} style={{ alignItems: 'flex-end', marginRight: 30, marginTop: 30 }}>
                <Text style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'tomato', borderRadius: 30, color: '#FFF' }}>Thanh toán</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //    justifyContent: 'center',
    },
    paymentInfo: {
        alignItems: 'center',
        width: '95%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        justifyContent: 'center',
        marginTop: 10,
    },
    ticket: {
        marginTop: 20,
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 20,
    },
});
