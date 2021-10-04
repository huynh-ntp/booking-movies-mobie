import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export function NowShowingBanner(props) {
    const { film } = props;
    return (
        <TouchableOpacity style={styles.container} activeOpacity="0.2">
            <Image source={{ uri: film.bannerImg }} style={styles.image}></Image>
            <Text style={styles.rate}>7.9</Text>
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
