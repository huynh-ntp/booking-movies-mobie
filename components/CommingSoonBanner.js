import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
export function CommingSoonBanner(props) {
    const { film } = props;
    const date = new Date(film.startDate);
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const strDate = `${day}/${month}/${year}`;

    return (
        <TouchableOpacity style={styles.container} activeOpacity="0.2">
            <Image source={{ uri: film.bannerImg }} style={styles.image}></Image>
            <Text style={styles.rate}>{strDate}</Text>
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
        width: 100,
        color: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginTop: '-12%',
        marginLeft: '65%',
        borderRadius: 10,
    },
});
