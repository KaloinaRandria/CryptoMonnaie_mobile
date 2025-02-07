import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../config/firebaseConfig'; // Import Firestore correctement
import { collection, addDoc } from 'firebase/firestore';

const Operation = () => {
    const [operation, setOperation] = useState('Depot');
    const [montant, setMontant] = useState('');

    const handleValidation = async () => {
        if (!montant) {
            Alert.alert("Erreur", "Veuillez entrer un montant valide.");
            return;
        }

        try {
            const userData = await AsyncStorage.getItem('user');
            const jeton = await AsyncStorage.getItem('jeton');

            if (!userData || !jeton) {
                Alert.alert("Erreur", "Utilisateur ou jeton non trouvé.");
                return;
            }

            const user = JSON.parse(userData);

            const operationData = {
                operation: operation,
                montant: parseFloat(montant),
                dateHeureOperation: new Date().toISOString(),
                typeOperation: operation === 'Depot' ? 'DEPOT' : 'RETRAIT',
                status: null,
                utilisateurId: user.id,
            };

            // Utiliser Firestore depuis firebaseConfig.js
            const operationRef = collection(firestore, 'operation');
            await addDoc(operationRef, operationData)
                .then(() => {
                    Alert.alert("Succès", `Opération "${operation}" de ${montant} $ enregistrée.`);
                    setMontant('');
                })
                .catch(error => {
                    Alert.alert("Erreur", "Erreur lors de l'enregistrement de l'opération.");
                    console.log(error);
                });
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            Alert.alert('Erreur', 'Une erreur est survenue.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Effectuer une Opération</Text>

            <Text style={styles.label}>Type d'opération :</Text>
            <Picker
                selectedValue={operation}
                style={styles.picker}
                onValueChange={(itemValue) => setOperation(itemValue)}
            >
                <Picker.Item label="Dépôt" value="Depot" />
                <Picker.Item label="Retrait" value="Retrait" />
            </Picker>

            <Text style={styles.label}>Montant :</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Entrez le montant"
                value={montant}
                onChangeText={setMontant}
            />

            <TouchableOpacity style={styles.button} onPress={handleValidation}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Operation;
