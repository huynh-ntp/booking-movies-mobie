import React from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ip from '../components/Util';
import DateTimePicker from 'react-native-modal-datetime-picker';
export default function Shows({ navigation, route }) {
    const { film } = route.params;
    const cinemaEndpoint = `http://${ip}:5000/api/cinemas/getAllCinemas`;
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
    }, []);
    const pickDate = (date) => {
        let d = new Date(date);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDay()));
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
        setCinemaChoose(cine.cinemaName);
        setCinemaPickerVisible(false);
    };
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setCinemaPickerVisible(true)} style={{ width: '40%' }}>
                            <Text style={styles.btCinema}>Chọn rạp</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>{cinemaChoose}</Text>
                    </View>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity style={{ width: '40%' }} onPress={showDatePicker}>
                            <Text style={styles.btCinema}>Chọn ngày</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>{`${timeChoose.toUTCString()}`}</Text>
                    </View>
                </View>
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
});
