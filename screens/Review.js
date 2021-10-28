import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import axios from 'axios';
import ip from '../components/Util';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function Review({ navigation, route }) {
    const { film } = route.params;
    const [reviewList, setReviewList] = useState([]);
    const [endPoint, setEndpoint] = useState(`http://${ip}:5000/api/ratings`);
    const [isVisible, setisVisible] = useState(false);
    const [score, setscore] = useState(10);
    const [review, setreview] = useState('');
    const [account, setaccount] = useState('');
    const [isLogin, setisLogin] = useState('');

    useEffect(() => {
        checkLogin();
        loadData();
    }, []);
    const checkLogin = async () => {
        var login = await AsyncStorage.getItem('isLogin');
        setisLogin(login);
    };
    const loadData = () => {
        axios
            .get(`${endPoint}/${film._id}`)
            .then((response) => {
                setReviewList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`http://${ip}:5000/api/users/me`)
            .then((res) => {
                setaccount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const rating = () => {
        axios
            .post(endPoint, {
                movieId: film._id,
                description: review,
                star: score,
                rateDate: new Date(),
                account: { _id: account._id },
            })
            .then((res) => {
                Alert.alert('Đánh giá thành công! ');
                resetRv();
            })
            .catch((err) => {
                console.log(err.response.data);
            });
        setisVisible(false);
        setscore(10);
        setreview('');
    };

    const resetRv = () => {
        axios
            .get(`${endPoint}/${film._id}`)
            .then((response) => {
                setReviewList((prevState) => {
                    prevState.push(response.data[reviewList.length]);
                    return [...prevState];
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let avg = 0;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.ratingTotal}>
                    {reviewList.map((rv) => {
                        avg += rv.star;
                    })}
                    <Text style={styles.totalScore}>
                        {Number.parseFloat(avg / reviewList.length).toFixed(1)}
                        <Image style={{ width: 20, height: 20 }} source={require('../assets/star.png')}></Image>
                    </Text>
                    <Text style={styles.totalPepleReview}>{reviewList.length} người đánh giá</Text>
                </View>
                <View style={styles.rating}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log(isLogin);
                            if (isLogin === 'true') {
                                setisVisible(true);
                            } else {
                                Alert.alert('Bạn cần đăng nhập trước để đánh giá');
                            }
                        }}
                    >
                        <Text style={styles.btnReview}>Viết Đánh Giá</Text>
                    </TouchableOpacity>
                </View>
                {reviewList.map((rv) => {
                    let date = new Date(rv.rateDate);
                    let dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
                    return (
                        <View style={styles.comment} key={rv._id}>
                            <View style={{ flexDirection: 'row', marginTop: 5, width: '100%' }}>
                                <View style={{ width: '10%', height: 20, marginTop: 5, marginLeft: 10 }}>
                                    <Image style={{ width: 40, height: 40 }} source={require('../assets/user.png')} />
                                </View>
                                <View style={{ width: '65%', height: 20, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18 }}>{rv.account[0].fullName}</Text>
                                </View>
                                <Text style={{ width: '20%', color: 'green', fontSize: 22 }}>
                                    {Number.parseFloat(rv.star).toFixed(1)}
                                    <Image style={{ width: 20, height: 20 }} source={require('../assets/star.png')}></Image>
                                </Text>
                            </View>
                            <View style={{ width: '100%' }}>
                                <Text style={{ marginLeft: 60, color: 'gray', fontSize: 12 }}>{dateStr}</Text>
                            </View>
                            <View style={{ width: '100%', height: 'auto' }}>
                                <Text style={{ marginLeft: 50, padding: 10 }}>{rv.description}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <Modal transparent={true} visible={isVisible} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>Viết đánh giá</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ padding: 10 }}>Nhận xét:</Text>
                            <TextInput
                                onChangeText={(value) => setreview(value)}
                                value={review}
                                style={{
                                    backgroundColor: '#FFF',
                                    width: 200,
                                    height: 40,
                                    padding: 10,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 12,
                                    },
                                    shadowOpacity: 0.58,
                                    shadowRadius: 16.0,
                                    borderRadius: 20,
                                    elevation: 24,
                                }}
                            ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ padding: 30 }}>Số điểm:</Text>
                            <Picker
                                selectedValue={score}
                                onValueChange={(value, index) => setscore(value)}
                                mode="dropdown" // Android only
                                style={styles.picker}
                            >
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="1" value="6" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <TouchableOpacity onPress={() => rating()}>
                                <Text style={{ borderRadius: 5, color: '#FFF', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'tomato', marginRight: 30 }}>Đánh giá</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setisVisible(false)}>
                                <Text style={{ borderRadius: 5, color: '#FFF', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'tomato' }}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        //    flex: 1,
        alignItems: 'center',
    },
    ratingTotal: {
        marginTop: 10,
        width: '100%',
        height: 80,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    totalScore: {
        marginTop: 10,
        fontSize: 22,
        color: 'green',
    },
    totalPepleReview: {
        color: 'gray',
    },
    rating: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#FFF',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnReview: {
        color: '#FFF',
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,

        elevation: 19,
    },
    comment: {
        width: '100%',
        marginTop: 10,
        //    marginLeft: '1%',
        height: 'auto',
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 60,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        backgroundColor: '#34e5eb',
    },
    picker: {
        marginVertical: 30,
        width: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: '#666',
    },
});
