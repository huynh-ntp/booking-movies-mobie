import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { NowShowingBanner } from '../components/NowShowingBanner';

export default class NowShowing extends Component {
    state = {
        filmList: [],
        endPoint: 'http://192.168.1.4:5000/api/movies/nowshowing',
    };

    componentDidMount() {
        axios
            .get(this.state.endPoint)
            .then((response) => {
                this.setState({
                    filmList: response.data,
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
                    <View style={styles.container}>
                        {this.state.filmList.map((film) => {
                            return <NowShowingBanner key={film.id} film={film} />;
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
});