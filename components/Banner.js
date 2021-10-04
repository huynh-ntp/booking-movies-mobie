import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';

export function Banner() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 200, marginTop: 20 }}>
            <View style={styles.banner}>
                <Image source={require('../assets/banner1.png')} style={styles.imageBanner}></Image>
            </View>
            <View style={styles.banner}>
                <Image source={require('../assets/banner2.jpg')} style={styles.imageBanner}></Image>
            </View>
            <View style={styles.banner}>
                <Image source={require('../assets/banner3.jpg')} style={styles.imageBanner}></Image>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: 350,
        height: 170,
        alignItems: 'center',
        borderRadius: 20,
    },
    imageBanner: {
        height: '90%',
        width: '90%',
        borderRadius: 20,
    },
});
