import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import ip from '../components/Util';
function Review({ navigation, route }) {
    const { film } = route.params;
    const [account, setAccount] = useState('');
    const [reviewList, setReviewList] = useState([]);
    const [endPont, setEndpoint] = useState(`http://${ip}:5000/api/ratings/${film._id}`);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        console.log(endPont);
        axios
            .get(endPont)
            .then((response) => {
                setReviewList(response.data);
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
                    <Text style={styles.totalScore}>{avg / reviewList.length}</Text>
                    <Text style={styles.totalPepleReview}>{reviewList.length} người đánh giá</Text>
                </View>
                <View style={styles.rating}>
                    <View style={{ width: '70%', height: 50 }}>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                    <TouchableOpacity style={{ width: '30%', height: 50 }}>
                        <Text style={styles.button}>Post</Text>
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
                                <View style={{ width: '70%', height: 20, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18 }}>{rv.account[0].fullName}</Text>
                                </View>
                                <Text style={{ width: '10%', color: 'green', fontSize: 22 }}>{rv.star}</Text>
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
        flexDirection: 'row',
    },
    input: {
        width: '100%',
        marginLeft: 15,
        height: 40,
        marginTop: 5,
        backgroundColor: '#92DDD0',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    button: {
        width: '62%',
        marginLeft: 30,
        marginTop: 5,
        backgroundColor: '#92DDD0',
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 20,
        borderRadius: 20,
    },
    comment: {
        width: '100%',
        marginTop: 10,
        //    marginLeft: '1%',
        height: 'auto',
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
});

export default Review;
