import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native';

export function FavoriteFilm(props) {
    const { film } = props;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: film.movieImg }} />
            <Text style={styles.rate}>7.9</Text>
            <Text style={styles.status}>Đang chiếu</Text>
            <Text style={styles.title}>{film.title}</Text>
            <TouchableOpacity style={styles.button} activeOpacity="0.2">
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
