import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ip from './Util';
import { useIsFocused } from '@react-navigation/core';

export function FavoriteFilm(props) {
    const { film, onPress } = props;
    const [star, setstar] = useState(0);
    const [endPont, setEndpoint] = useState(`http://${ip}:5000/api/ratings/${film._id}`);
    const isForcused = useIsFocused();
    useEffect(() => {
        axios
            .get(endPont)
            .then((response) => {
                let rvList = response.data;
                let sumStar = 0;
                rvList.map((rv) => {
                    sumStar += rv.star;
                });
                setstar(sumStar / rvList.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isForcused]);
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: film.movieImg }} />
            <Text style={styles.rate}>{Number.parseFloat(star).toFixed(1)}</Text>
            <Text style={styles.status}>Đang chiếu</Text>
            <Text style={styles.title}>{film.title.length > 20 ? `${film.title.substring(0, 20)}...` : film.title}</Text>
            <TouchableOpacity style={styles.button} activeOpacity="0.2" onPress={onPress}>
                <Text style={{ color: '#FFF' }}>ĐẶT VÉ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '90%',
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 25,
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 25,
        opacity: 0.7,
    },
    rate: {
        color: '#FFF',
        marginTop: '-80%',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 40,
        marginLeft: '84%',
        borderRadius: 20,
        fontWeight: 'bold',
    },
    status: {
        color: '#FFF',
        fontSize: 18,
        marginTop: '45%',
        marginLeft: '5%',
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        marginLeft: '5%',
        fontWeight: '900',
    },
    button: {
        backgroundColor: 'orange',
        width: 70,
        padding: 5,
        marginTop: '-10%',
        marginLeft: '75%',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});
