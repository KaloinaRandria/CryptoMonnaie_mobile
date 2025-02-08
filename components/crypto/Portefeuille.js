import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../config/firebaseConfig';
import { doc, onSnapshot, collection, getDocs, getDoc } from 'firebase/firestore';

const Portefeuille = () => {
    const [solde, setSolde] = useState(0);
    const [email, setEmail] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user.mail) {
                        setEmail(user.mail);
                        listenToUserSolde(user.mail);
                        fetchTransactions();
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
            const userDocRef = doc(firestore, 'utilisateurs', userEmail);
            return onSnapshot(userDocRef, (userDocSnap) => {
                if (userDocSnap.exists()) {
                    setSolde(userDocSnap.data().solde || 0);
                }
            });
        };

        const fetchUserByEmail = async (userEmail) => {
            try {
                const userDocRef = doc(firestore, 'utilisateurs', userEmail);
                const userDocSnap = await getDoc(userDocRef);
                return userDocSnap.exists() ? userDocSnap.data().nom : 'Utilisateur inconnu';
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur:', error);
                return 'Utilisateur inconnu';
            }
        };

        const fetchCryptoById = async (cryptoId) => {
            try {
                const cryptoDocRef = doc(firestore, 'crypto-monnaies', String(cryptoId));
                const cryptoDocSnap = await getDoc(cryptoDocRef);
                return cryptoDocSnap.exists() ? cryptoDocSnap.data().symbol : 'N/A';
            } catch (error) {
                console.error('Erreur lors de la récupération de la cryptomonnaie:', error);
                return 'N/A';
            }
        };

        const fetchImageByEmail = async (userEmail) => {
            try {
                const userDocRef = doc(firestore, 'image-utilisateur', userEmail);
                const userDocSnap = await getDoc(userDocRef);
                return userDocSnap.exists() ? userDocSnap.data().url : null; // Retourne l'URL ou null
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'image:', error);
                return null;
            }
        };

        const fetchTransactions = async () => {
            try {
                const transactionsCollectionRef = collection(firestore, 'transactions');
                const querySnapshot = await getDocs(transactionsCollectionRef);
                const transactionsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const userName = await fetchUserByEmail(data.mail);
                    const userImage = await fetchImageByEmail(data.mail); // 🔹 Utilisation de ta fonction
                    const cryptoSymbol = await fetchCryptoById(data.id_crypto);
                    return { ...data, userName, userImage, cryptoSymbol };
                }));
                setTransactions(transactionsList);
            } catch (error) {
                console.error('Erreur lors de la récupération des transactions:', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des transactions.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.balanceTitle}>Solde Disponible</Text>
            <Text style={styles.balance}>${solde.toLocaleString()}</Text>

            <Text style={styles.transactionsTitle}>Historiques Transactions</Text>
            {transactions.length === 0 ? (
                <Text>Aucune transaction disponible</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.transaction}>
                            <View style={styles.userContainer}>
                                {item.userImage ? (
                                    <Image source={{ uri: item.userImage }} style={styles.userImage} />
                                ) : (
                                    <Text style={styles.noImage}>🚫</Text>  // 🔹 Icône si pas d'image
                                )}
                                <Text style={styles.userName}>{item.userName}</Text>
                            </View>
                            <Text>Type: {item.type_transaction}</Text>
                            <Text>Quantité: {item.quantite}</Text>
                            <Text>Prix Total: {item.prix_total}</Text>
                            <Text>Crypto: {item.cryptoSymbol}</Text>
                            <Text>Date: {item.date_heure}</Text>
                        </View>
                    )}
                />
            )}
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
    transactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    transaction: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noImage: {
        fontSize: 16,
        color: 'red',
    },
});

export default Portefeuille;
