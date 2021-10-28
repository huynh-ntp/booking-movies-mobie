import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ip from './Util';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
export function NowShowingBanner(props) {
    const { film, onPress } = props;
    const [star, setstar] = useState(0);
    const [endPont, setEndpoint] = useState(`http://${ip}:5000/api/ratings/${film._id}`);
    const isFocused = useIsFocused();
    useEffect(() => {
        axios
            .get(endPont)
            .then((response) => {
                let rvList = response.data;
                let sumStar = 0;
                rvList.map((rv) => {
                    sumStar += rv.star;
                });
                if (rvList.length !== 0) {
                    setstar(sumStar / rvList.length);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isFocused]);

    return (
        <TouchableOpacity style={styles.container} activeOpacity="0.2" onPress={onPress}>
            <Image source={{ uri: film.bannerImg }} style={styles.image}></Image>
            <Text style={styles.rate}>{Number.parseFloat(star).toFixed(1)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginTop: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    rate: {
        backgroundColor: '#756B6B',
        width: 40,
        color: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: '-47%',
        marginLeft: '82%',
        borderRadius: 10,
    },
});
