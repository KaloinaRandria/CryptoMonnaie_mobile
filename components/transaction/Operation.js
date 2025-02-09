import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../config/firebaseConfig';
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
            if (!userData) {
                Alert.alert("Erreur", "Utilisateur non trouvé.");
                return;
            }

            const user = JSON.parse(userData);
            console.log('Utilisateur user :', user.email);
            const operationData = {
                montant: parseFloat(montant),
                dateHeureOperation: new Date().toISOString(),
                typeOperation: operation === 'Depot' ? 'DEPOT' : 'RETRAIT',
                status: null,
                mail: user.email,
            };

            const operationRef = collection(firestore, 'operation');
            await addDoc(operationRef, operationData);
            
            Alert.alert("Succès", `Opération "${operation}" de ${montant} $ enregistrée.`);
            setMontant('');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement :', error);
            Alert.alert('Erreur', 'Une erreur est survenue.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Effectuer une Opération</Text>

            <Text style={styles.label}>Type d'opération :</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={operation}
                    style={styles.picker}
                    onValueChange={(itemValue) => setOperation(itemValue)}
                >
                    <Picker.Item label="Dépôt" value="Depot" />
                    <Picker.Item label="Retrait" value="Retrait" />
                </Picker>
            </View>

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
        backgroundColor: '#f5f7fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 5,
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
        marginBottom: 15,
    },
    picker: {
        height: 50,
        color: '#2c3e50',
    },
    input: {
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#2c3e50',
        marginBottom: 20,
        elevation: 2,
    },
    button: {
        backgroundColor: '#27ae60',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#27ae60',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Operation;
