// Home.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    const handleStartPress = () => {
        navigation.navigate('Quizz');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue!</Text>
            <Button title="Start" onPress={handleStartPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Home;
