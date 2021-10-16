import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { NowShowingBanner } from '../components/NowShowingBanner';
import ip from '../components/Util';
export default class NowShowing extends Component {
    state = {
        filmList: [],
        filmListShow: [],
        endPoint: `http://${ip}:5000/api/movies/nowshowing`,
        search: '',
    };

    componentDidMount() {
        axios
            .get(this.state.endPoint)
            .then((response) => {
                this.setState({
                    filmList: response.data,
                });
                this.setState({
                    filmListShow: response.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSearch(value) {
        this.setState({
            search: value,
        });
        let result = [];
        this.state.filmList.map((f) => {
            if (f.title.toLowerCase().includes(value.toLowerCase())) {
                result.push(f);
            }
        });
        this.setState({
            filmListShow: result,
        });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.search}>
                            <TextInput onChangeText={(value) => this.handleSearch(value)} value={this.state.search} placeholder="Search" style={styles.input}></TextInput>
                        </View>
                        {this.state.filmListShow.map((film) => {
                            return <NowShowingBanner key={film._id} film={film} />;
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
        backgroundColor: '#FFF',
    },
    search: {
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        marginTop: 10,
    },
    input: {
        paddingHorizontal: 30,
        paddingVertical: 3,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 19,
        borderRadius: 20,
        width: '100%',
    },
});
