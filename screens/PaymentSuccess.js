import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
export function PaymentSuccess({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 100, height: 100 }} source={require('../assets/checked.png')}></Image>
            <Text style={{ fontSize: 24, marginTop: 30 }}>Đặt vé thành công</Text>
            <Text style={{ marginBottom: 30 }}>Xin cảm ơn quý khách</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#32ba7c', borderRadius: 20 }}>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
});
