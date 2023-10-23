import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const Quiz = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timer, setTimer] = useState(30);
    const [isRunning, setIsRunning] = useState(true);
    const [lives, setLives] = useState(3);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const route = useRoute();
    const { quizData } = route.params;

    useEffect(() => {
        if (quizData.quiz) {
            setShuffledQuestions(shuffleArray(Object.values(quizData.quiz)));
        }
    }, []);

    useEffect(() => {
        let interval;

        if (timer > 0 && isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            handleTimeUp();
        }

        return () => clearInterval(interval);
    }, [timer, isRunning, currentQuestion, shuffledQuestions]);

    const handleTimeUp = () => {
        const correctAnswer = getCurrentQuestion().answer;
        setSelectedOption(correctAnswer);
        decrementLives();
    };

    const resetTimer = () => {
        setTimer(30);
    };

    const handleAnswer = (option) => {
        const correctAnswer = getCurrentQuestion().answer;

        if (option === correctAnswer) {
            setScore(score + timer);
        } else {
            decrementLives();
        }

        clearTimeout(timer);
        setIsRunning(!isRunning);
        setSelectedOption(option);
    };

    const decrementLives = async () => {
        setLives(lives - 1);

        if (lives === 1) {
            Alert.alert(
                'Game Over',
                `You've lost all your lives! Your final score is ${score}`,
                [
                    {
                        text: 'Close',
                        onPress: () => navigation.navigate('Quiz'),
                    },
                ],
                { cancelable: false }
            );
        }
    };

    const renderHearts = () => {
        return Array.from({ length: lives }, (_, index) => (
            <Text key={index} style={{ color: 'red', fontSize: 20 }}>
                ❤️
            </Text>
        ));
    };

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        resetTimer();
        setIsRunning(true);
        setLives(3);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < getTotalQuestions() - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            resetTimer();
            setIsRunning(true);
        } else {
            setShowScore(true);
        }
    };

    const getCurrentQuestion = () => {
        return shuffledQuestions[currentQuestion] || {};
    };

    const getTotalQuestions = () => shuffledQuestions.length;

    const renderOptions = () => {
        const options = getCurrentQuestion().options || [];
        const correctAnswer = getCurrentQuestion().answer || '';

        return options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={{
                    ...styles.buttonContainer,
                    backgroundColor: getButtonColor(option, correctAnswer),
                }}
                onPress={() => handleAnswer(option)}
                disabled={selectedOption !== null}
            >
                <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
        ));
    };

    const getButtonColor = (option, correctAnswer) => {
        if (selectedOption !== null) {
            return option === correctAnswer
                ? 'rgba(76, 175, 80, 0.54)'
                : option === selectedOption
                    ? 'rgba(229, 115, 115, 0.62)'
                    : 'rgb(44, 44, 44)';
        } else {
            return 'rgb(44, 44, 44)';
        }
    };

    const renderCorrectAnswer = () => {
        if (showScore) {
            const currentQuestion = getCurrentQuestion();
            const correctAnswer = currentQuestion.answer || '';
            return (
                <View>
                    <Text style={styles.correctAnswer}>Correct Answer: {correctAnswer}</Text>
                    <Text style={styles.scoreText}>Score: {score}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.scoreText}>Lives: </Text>
                        {renderHearts()}
                    </View>
                </View>
            );
        }
        return null;
    };

    const renderNextButton = () => {
        if (selectedOption !== null || showScore) {
            return (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                    <Ionicons name="md-arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <>
                    <View style={styles.timer}>
                        <Text style={styles.timerText}>{timer}</Text>
                    </View>
                    <Text style={styles.scoreText}>Score {score}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={styles.scoreText}></Text>
                        {renderHearts()}
                    </View>
                    <Text style={styles.questionText}>{getCurrentQuestion().question}</Text>
                    {renderOptions()}
                    {renderNextButton()}
                    {renderCorrectAnswer()}
                </>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    quizButton: {
        marginTop: 10,
        width: '70%',
        backgroundColor: 'rgb(44,44,44)',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        backgroundColor: 'rgb(44,44,44)',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    scoreText: {
        marginBottom: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    questionText: {
        marginBottom: 20,
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    correctAnswer: {
        marginTop: 30,
        color: 'white',
        fontSize: 16,
    },
    nextButton: {
        position: 'absolute',
        bottom: -20,
        right: 20,
        backgroundColor: 'rgb(44,44,44)',
        padding: 15,
        borderRadius: 50,
    },
    timer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 150,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Quiz;
