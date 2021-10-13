import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import ip from '../components/Util';
import axios from 'axios';
export default class Cinema extends Component {
    state = {
        cinemaList: [],
        endPoint: `http://${ip}:5000/api/cinemas/getAllCinemas`,
    };
    componentDidMount() {
        axios
            .get(this.state.endPoint)
            .then((res) => {
                this.setState({
                    cinemaList: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.cinemaList.map((cine) => (
                        <View style={styles.container} key={cine._id}>
                            <TouchableOpacity style={styles.cinemaDiv}>
                                <View style={{ width: '20%', height: '100%' }}>
                                    <Image source={{ uri: cine.imgUrl }} style={styles.cinemaImg} />
                                </View>
                                <View style={{ width: '70%', height: '100%', marginLeft: 10, marginTop: 20 }}>
                                    <Text style={styles.cinemaName}>{cine.cinemaName}</Text>
                                    <Text style={styles.cinemaAddres}>{cine.cinemaAddress}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
    },
    cinemaDiv: {
        width: '95%',
        height: 80,
        backgroundColor: '#FFF',
        borderRadius: 20,
        flexDirection: 'row',
    },
    cinemaImg: {
        width: '100%',
        height: '100%',
    },
    cinemaName: {
        fontSize: 18,
    },
    cinemaAddres: {
        color: 'gray',
    },
});
