import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

export default class Profile extends Component {
    goToLoginScreen() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <SafeAreaView>
                <Text>Profile</Text>
                <Button
                    onPress={() => {
                        this.goToLoginScreen();
                    }}
                    title="Login"
                ></Button>
            </SafeAreaView>
        );
    }
}
