import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../config/firebaseConfig'; // Assure-toi d'avoir configuré Firestore
import { doc, onSnapshot } from 'firebase/firestore';

const Portefeuille = () => {
    const [solde, setSolde] = useState(0); // Initialisation du solde à 0
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Récupérer l'email de l'utilisateur depuis AsyncStorage
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    console.log('Utilisateur récupéré:', user);
                    if (user.mail) {
                        setEmail(user.mail); // Assurez-vous que l'email est présent dans l'objet utilisateur
                        listenToUserSolde(user.mail); // Écouter les changements du solde en temps réel
                    } else {
                        Alert.alert('Erreur', 'Email manquant dans les données utilisateur.');
                    }
                } else {
                    Alert.alert('Erreur', 'Utilisateur non trouvé dans AsyncStorage.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
                Alert.alert('Erreur', 'Une erreur est survenue.');
            }
        };

        const listenToUserSolde = (userEmail) => {
            try {
                // Vérifier si l'email est valide
                if (!userEmail) {
                    throw new Error('L\'email de l\'utilisateur est invalide.');
                }

                // Accéder à la collection Firestore en utilisant l'email de l'utilisateur
                const userDocRef = doc(firestore, 'utilisateurs', userEmail); // Remplace 'utilisateurs' par le nom de ta collection

                // Écouter les changements du document utilisateur en temps réel
                const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
                    if (userDocSnap.exists()) {
                        // Si le document existe, récupérer le solde
                        const userSolde = userDocSnap.data().solde;
                        if (userSolde !== undefined) {
                            setSolde(userSolde); // Mettre à jour le solde
                            // Mettre à jour le solde dans AsyncStorage
                            AsyncStorage.setItem('user', JSON.stringify({
                                ...userDocSnap.data(),
                                email: userEmail
                            }));
                        } else {
                            Alert.alert('Erreur', 'Le solde n\'est pas défini pour cet utilisateur.');
                        }
                    } else {
                        Alert.alert('Erreur', 'Aucun utilisateur trouvé avec cet email.');
                    }
                });

                // Retourner l'abonnement pour pouvoir le désabonner plus tard
                return unsubscribe;

            } catch (error) {
                console.error('Erreur lors de l\'écoute des changements du solde:', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de l\'écoute des changements du solde.');
            }
        };

        fetchUserData();
    }, []); // [] garantit que l'effet se déclenche une seule fois lors du montage du composant

    return (
        <View style={styles.container}>
            {/* Solde de l'utilisateur */}
            <Text style={styles.balanceTitle}>Solde Disponible</Text>
            <Text style={styles.balance}>${solde.toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    balanceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#333',
    },
    balance: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#007bff',
    },
    email: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
});

export default Portefeuille;
