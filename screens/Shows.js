import React from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ip from '../components/Util';
import DateTimePicker from 'react-native-modal-datetime-picker';
export default function Shows({ navigation, route }) {
    const { film } = route.params;
    const cinemaEndpoint = `http://${ip}:5000/api/cinemas/getAllCinemas`;
    const showsEndpoint = `http://${ip}:5000/api/cinemas/filterCinema`;
    const [cinemaList, setCinemaList] = useState([]);
    const [showTimeList, setShowTimeList] = useState([]);
    const [cinemaChoose, setCinemaChoose] = useState('');
    const [timeChoose, setTimeChoose] = useState(new Date());
    const [isCinemaPickerVisible, setCinemaPickerVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        axios
            .get(cinemaEndpoint)
            .then((res) => {
                setCinemaList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        navigation.addListener('focus', () => {
            getShowtimes(cinemaChoose);
        });
    }, []);
    useEffect(() => {
        if (cinemaChoose !== '') {
            getShowtimes(cinemaChoose);
        }
    }, [timeChoose]);
    const pickDate = (date) => {
        let d = new Date(date);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        setTimeChoose(d);
        hideDatePicker();
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const pickCinema = (cine) => {
        setCinemaChoose(cine);
        setCinemaPickerVisible(false);
        getShowtimes(cine);
    };
    const getShowtimes = async (cine) => {
        let dateStr = timeChoose.getFullYear() + '-' + `${timeChoose.getMonth() + 1}` + '-' + timeChoose.getDate();

        axios
            .post(showsEndpoint, {
                id: cine._id,
                movies: film._id,
                startDate: dateStr,
            })
            .then((res) => {
                if (res.data.length === 0 || res.data[0].showtimes === 0) {
                    setShowTimeList([]);
                } else {
                    setShowTimeList(res.data[0].showtimes);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const goToShowDetail = (s) => {
        navigation.navigate('ShowDetail', {
            show: { s },
        });
    };
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setCinemaPickerVisible(true)} style={{ width: '40%' }}>
                            <Text style={styles.btCinema}>Chọn rạp</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>{cinemaChoose.cinemaName}</Text>
                    </View>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity style={{ width: '40%' }} onPress={() => showDatePicker()}>
                            <Text style={styles.btCinema}>Chọn ngày</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>{`${timeChoose.toUTCString()}`}</Text>
                    </View>
                </View>
                {showTimeList.length !== 0 ? <Text style={{ paddingVertical: 5, paddingHorizontal: 150, fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>Lịch chiếu</Text> : <Text></Text>}
                {showTimeList.map((s) => {
                    let startDate = new Date(s.startDate);
                    let endDate = new Date(s.endDate);
                    let timeShow = `${startDate.getUTCHours() >= 10 ? startDate.getUTCHours() : '0' + startDate.getUTCHours()}:${startDate.getUTCMinutes() >= 10 ? startDate.getUTCMinutes() : '0' + startDate.getUTCMinutes()} to ${endDate.getUTCHours() >= 10 ? endDate.getUTCHours() : '0' + endDate.getUTCHours()}:${endDate.getUTCMinutes() >= 10 ? endDate.getUTCMinutes() : '0' + endDate.getUTCMinutes()}`;
                    return (
                        <TouchableOpacity onPress={() => goToShowDetail(s)} key={s._id} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.timeShow}>
                                <Text style={{ color: 'red', fontSize: 16 }}>{timeShow}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            <DateTimePicker mode="date" isVisible={isDatePickerVisible} onConfirm={pickDate} onCancel={hideDatePicker}></DateTimePicker>
            <Modal style={styles.modal} transparent visible={isCinemaPickerVisible} animationType="slide">
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => setCinemaPickerVisible(false)} style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {cinemaList.map((cine) => (
                            <View key={cine._id} style={styles.cinemaContainer}>
                                <TouchableOpacity
                                    style={styles.cinemaDiv}
                                    onPress={() => {
                                        pickCinema(cine);
                                    }}
                                >
                                    <View style={{ width: '20%', height: '100%' }}>
                                        <Image source={{ uri: cine.imgUrl }} style={styles.cinemaImg} />
                                    </View>
                                    <View style={{ width: '70%', height: '100%', marginLeft: 10, marginTop: 20 }}>
                                        <Text style={styles.cinemaName}>{cine.cinemaName}</Text>
                                        <Text style={styles.cinemaAddres}>{cine.cinemaAddress}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
        backgroundColor: '#FFF',
        marginTop: 10,
    },
    btCinema: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#FF5733',
        borderRadius: 10,
        marginLeft: 10,
    },
    closeButton: {
        marginEnd: 10,
        marginTop: 10,
        fontWeight: 'bold',
        borderRadius: 20,
        backgroundColor: '#FF9B70',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    modal: {
        flex: 1,
        backgroundColor: '#92DDD0',
    },
    cinemaContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    cinemaDiv: {
        width: '95%',
        height: 80,
        backgroundColor: '#FFF',
        borderRadius: 20,
        flexDirection: 'row',
    },
    cinemaImg: {
        width: '100%',
        height: '100%',
    },
    cinemaName: {
        fontSize: 18,
    },
    cinemaAddres: {
        color: 'gray',
    },
    timeShow: {
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
});
