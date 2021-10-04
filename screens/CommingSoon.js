import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CommingSoonBanner } from '../components/CommingSoonBanner';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
export default class CommingSoon extends Component {
    state = {
        filmList: [],
        endPoint: 'http://192.168.1.4:5000/api/movies/comingsoon',
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
    //     componentDidUpdate() {
    //         axios
    //             .get(this.state.endPoint)
    //             .then((response) => {
    //                 this.setState({
    //                     filmList: response.data,
    //                 });
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }

    render() {
        console.log(this.state.filmList);
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        {this.state.filmList.map((film) => {
                            return <CommingSoonBanner key={film.id} film={film} />;
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
