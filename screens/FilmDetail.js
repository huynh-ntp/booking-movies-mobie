import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView } from 'react-native';

export default function FilmDetail({ navigation, route }) {
    const { film } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%', marginTop: 10, marginBottom: 20 }}>
                <View style={{ height: 500, width: '100%', alignItems: 'center' }}>
                    <Image source={{ uri: film.movieImg }} style={styles.image} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{film.title}</Text>
                    <Text style={styles.duration}>
                        {film.movieDuration}p - {film.movieFormat}
                    </Text>
                    <Text>Nội Dung</Text>
                    <Text style={styles.description}>{film.description}</Text>
                    <Text style={styles.nationality}>QGSX: {film.national}</Text>
                    <Text style={styles.category}>Thể loại: {film.category}</Text>
                    <Text>Diễn viên/Đạo diễn: {film.cast}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //    backgroundColor: '#92DDD0',
        //    backgroundColor: '#FFF',
    },
    image: {
        width: '100%',
        height: 500,
        borderRadius: 20,
    },
    info: {
        marginTop: 10,
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    duration: {
        color: 'gray',
        marginLeft: 10,
    },
    description: {
        color: 'gray',
        marginLeft: 20,
    },
    nationality: {
        color: 'gray',
        marginTop: 5,
    },
    cast: {},
});
