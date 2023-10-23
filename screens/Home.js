import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    const availableQuizzes = [
        { name: 'Matei', data: require('../quiz/quizMatei.json') },
        { name: 'Luca', data: require('../quiz/quizLuca.json') },
    ];


    const handleQuizStart = (quizData) => {
        navigation.navigate('Quiz', { quizData });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.quizSelectionTitle}>Choose a Quiz:</Text>
            <View style={styles.quizSelectionContainer}>
                {availableQuizzes.map((quiz, index) => (
                    <Button
                        key={index}
                        title={`Start ${quiz.name} Quiz`}
                        onPress={() => handleQuizStart(quiz.data)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizSelectionContainer: {
        width: '120%',
        alignItems: 'center',
        marginTop: 50,
    },
    quizSelectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    quizButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Home;
