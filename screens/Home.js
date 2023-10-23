import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const availableQuizzes = [
        { name: 'Exod 13-26', data: require('../quiz/exod13-26.json') },
        { name: 'Matei 1-10 ', data: require('../quiz/matei1-10.json') },
        { name: 'Luca', data: require('../quiz/quizLuca.json') },
    ];

    const handleQuizStart = (quizData) => {
        navigation.navigate('Quiz', { quizData });
    };

    const handleSettings = () => {
        navigation.navigate('Settings');
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {setIsModalVisible(false);};

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profileButton} onPress={() => alert("Icône de profil cliquée")}>
                <Feather name="user" size={24} color="white" />
            </TouchableOpacity>

            {/*<Text style={styles.quizSelectionTitle}>Quiz</Text>*/}
            <View style={styles.quizSelectionContainer}>
                {availableQuizzes.map((quiz, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.quizButton}
                        onPress={() => handleQuizStart(quiz.data)}
                    >
                        <Text style={styles.quizButtonText}>{quiz.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Barre de navigation en bas de l'écran */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton} onPress={handleSettings}>
                    <Feather name="settings" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={openModal}>
                    <Feather name="help-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() =>  navigation.navigate('Login')}>
                    <Feather name="log-in" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => alert("Bouton de classement cliqué")}>
                    <Feather name="award" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Règles du Quiz</Text>
                            <Text style={styles.modalText}>
                                Ajoutez ici les règles du quiz...
                            </Text>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    navButton: {
        padding: 10,
        borderRadius: 40,
        backgroundColor: 'rgb(44, 44, 44)',
        margin: 5,
    },
    profileButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgb(44, 44, 44)',
        padding: 10,
        borderRadius: 40,
    },
    quizSelectionContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    quizSelectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    quizButton: {
        marginTop: 10,
        width: '70%',
        backgroundColor: 'rgb(44, 44, 44)',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    quizButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'rgb(44, 44, 44)',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: 'white',
    },
});

export default Home;
