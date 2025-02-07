import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebase from 'firebase/app';  // Si ce n'est pas déjà importé


const Operation = () => {
    const [operation, setOperation] = useState('Depot');
    const [montant, setMontant] = useState('');

    const handleValidation = async  () => {
        if (!montant) {
            Alert.alert("Erreur", "Veuillez entrer un montant valide.");
            return;
        }

         // Créer une nouvelle opération
         try {
            const userData = await AsyncStorage.getItem('user');
            const jeton = await AsyncStorage.getItem('jeton');
   
            if (!userData || !jeton) {
                Alert.alert("Erreur", "Utilisateur ou jeton non trouvé.");
                return;
            }
   
            const user = JSON.parse(userData);
   
            // Créer une nouvelle opération
            const operationData = {
                operation: operation,
                montant: parseFloat(montant),
                dateHeureOperation: new Date().toISOString(),
                typeOperation: operation === 'Depot' ? 'DEPOT' : 'RETRAIT',
                status: true,
                utilisateurId: user.id // Ajouter l'ID utilisateur
            };
   
            // Enregistrer l'opération dans Firestore
            const db = getFirestore();
            const operationRef = collection(db, 'operation'); // Nom de la collection
            await addDoc(operationRef, operationData)  // Ajouter le document dans la collection
                .then(() => {
                    Alert.alert("Succès", `Opération "${operation}" de ${montant} $ enregistrée et en attente de validation.`);
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
