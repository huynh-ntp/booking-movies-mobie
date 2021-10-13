import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export function Hot(props) {
    const { film, onPress } = props;
    return (
        <View style={styles.container}>
            <View style={{ width: '35%', height: '100%' }}>
                <Image style={styles.image} source={{ uri: film.movieImg }} />
            </View>
            <View style={styles.description}>
                <Text style={styles.title}>{film.title}</Text>
                <Text style={styles.minute}>{film.movieDuration}p</Text>
                <Text style={styles.rate}>7.9</Text>
                <TouchableOpacity style={styles.button} activeOpacity="0.2" onPress={onPress}>
                    <Text style={{ color: '#FFF' }}>ĐẶT VÉ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 100,
        backgroundColor: '#FFF',
        marginTop: 10,
        flexDirection: 'row',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    description: {
        width: '65%',
        marginTop: 5,
        marginLeft: '5%',
    },
    title: {
        fontSize: 16,
        fontWeight: '900',
    },
    minute: {
        color: '#A49696',
        fontSize: 12,
        marginLeft: '5%',
        marginTop: 5,
    },
    rate: {
        backgroundColor: '#756B6B',
        width: 40,
        color: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#FF5733',
        width: 70,
        padding: 5,
        marginTop: -30,
        marginLeft: 95,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});
