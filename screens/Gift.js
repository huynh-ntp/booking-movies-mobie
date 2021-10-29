import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

export default class Gift extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 250, height: 300 }} source={require('../assets/baotri.png')}></Image>
                <Text style={styles.title}>Voucher đang bảo trì</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        color: 'tomato',
    },
});
