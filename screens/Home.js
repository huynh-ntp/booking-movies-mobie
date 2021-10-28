import React, { Component, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { FavoriteFilm } from '../components/FavoriteFilm';
import { Banner } from '../components/Banner';
import { Hot } from '../components/Hot';
import ip from '../components/Util';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/core';
export function Home({ navigation }) {
    const [filmList, setfilmList] = useState([]);
    const endPoint = `http://${ip}:5000/api/movies/nowshowing`;
    const isForcus = useIsFocused();
    useEffect(() => {
        getFilm();
    }, [isForcus]);

    const getFilm = async () => {
        axios
            .get(endPoint)
            .then((response) => {
                let films = response.data;
                setfilmList((preState) => {
                    preState = [];
                    films.map((f) => {
                        preState.push(f);
                    });
                    return [...preState];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const clickToBooking = (film) => {
        navigation.navigate('Film', {
            film: { film },
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner />
                <Text style={{ marginLeft: 20, marginTop: -25, fontSize: 16 }}>Phim được yêu thích nhất</Text>
                <View style={{ alignItems: 'center' }}>
                    {filmList.map((film, index) => {
                        if (index >= 0 && index <= 2) {
                            return <FavoriteFilm key={film._id} film={film} onPress={() => clickToBooking(film)} />;
                        }
                    })}
                </View>
                <View style={{ height: 370, alignItems: 'center', marginBottom: 30 }}>
                    <View style={styles.hot}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Text style={styles.title1}>Rạp phim đang có gì?</Text>
                            <TouchableOpacity style={styles.watchAll} onPress={() => navigation.navigate('NowShowing')}>
                                <Text style={{ color: '#EC4118' }}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        {filmList.map((film, index) => {
                            if (index >= 3 && index <= 5) {
                                return <Hot key={film._id} film={film} onPress={() => clickToBooking(film)} />;
                            }
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    hot: {
        height: 370,
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    title1: {
        width: '65%',
        marginTop: 10,
        marginLeft: 20,
    },
    watchAll: {
        width: '35%',
        height: 20,
        marginTop: 10,
    },
});
