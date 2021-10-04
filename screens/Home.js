import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { FavoriteFilm } from '../components/FavoriteFilm';
import { Banner } from '../components/Banner';
import { Hot } from '../components/Hot';
import axios from 'axios';
export default class Home extends Component {
    state = {
        filmList: [],
        endPoint: 'http://192.168.1.4:5000/api/movies/nowshowing',
    };

    componentDidMount() {
        axios
            .get(this.state.endPoint)
            .then((response) => {
                let film = response.data;
                console.log(response.data);
                this.setState({
                    filmList: film,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        console.log(this.setState.filmList);
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Banner />
                    <Text style={{ marginLeft: 20, marginTop: -25, fontSize: 16 }}>Phim được yêu thích nhất</Text>
                    <View style={{ alignItems: 'center' }}>
                        {this.state.filmList.map((film, index) => {
                            if (index >= 0 && index <= 2) {
                                return <FavoriteFilm key={film.id} film={film} />;
                            }
                        })}
                    </View>
                    <View style={{ height: 370, alignItems: 'center', marginBottom: 30 }}>
                        <View style={styles.hot}>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <Text style={styles.title1}>Rạp phim đang có gì?</Text>
                                <TouchableOpacity style={styles.watchAll}>
                                    <Text style={{ color: '#EC4118' }}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.filmList.map((film, index) => {
                                if (index >= 3 && index <= 5) {
                                    return <Hot key={film.id} film={film} />;
                                }
                            })}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    hot: {
        height: 370,
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    title1: {
        width: '65%',
        marginTop: 10,
        marginLeft: 20,
    },
    watchAll: {
        width: '35%',
        height: 20,
        marginTop: 10,
    },
});
