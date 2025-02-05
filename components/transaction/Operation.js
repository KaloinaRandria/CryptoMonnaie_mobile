import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Operation = () => {
    const [operation, setOperation] = useState('Depot');
    const [montant, setMontant] = useState('');

    const handleValidation = () => {
        if (!montant) {
            Alert.alert("Erreur", "Veuillez entrer un montant valide.");
            return;
        }
        console.log(`Opération: ${operation}, Montant: ${montant} $`);
        Alert.alert("Succès", `Opération "${operation}" de ${montant} $ effectuée.`);
        setMontant('');
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
