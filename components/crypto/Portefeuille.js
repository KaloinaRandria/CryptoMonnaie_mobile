import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../config/firebaseConfig';
import { doc, onSnapshot, collection, getDoc } from 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/fr'; // Ajout du français

moment.locale('fr');

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
                        listenToTransactions(); // Écoute des transactions en temps réel
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

        const listenToTransactions = () => {
            const transactionsCollectionRef = collection(firestore, 'transactions');
            return onSnapshot(transactionsCollectionRef, async (querySnapshot) => {
                const transactionsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const userName = await fetchUserByEmail(data.mail);
                    const userImage = await fetchImageByEmail(data.mail);
                    const cryptoSymbol = await fetchCryptoById(data.id_crypto);
                    return { ...data, userName, userImage, cryptoSymbol };
                }));
                setTransactions(transactionsList);
            });
        };

        fetchUserData();
    }, []);

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
            return userDocSnap.exists() ? userDocSnap.data().url : null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'image:', error);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.balanceTitle}>Solde Actuel</Text>
            <Text style={styles.balance}>${solde.toLocaleString()}</Text>

            <Text style={styles.transactionsTitle}>Historiques Transactions</Text>
            {transactions.length === 0 ? (
                <Text>Aucune transaction</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const formattedDate = moment(item.date_heure).format('DD MMM YYYY');
                        const formattedTime = moment(item.date_heure).format('HH:mm');

                        return (
                            <View style={styles.transaction}>
                                <View style={styles.userContainer}>
                                    {item.userImage ? (
                                        <Image source={{ uri: item.userImage }} style={styles.userImage} />
                                    ) : (
                                        <Text style={styles.noImage}>🚫</Text>
                                    )}
                                    <Text style={styles.userName}>{item.userName}</Text>
                                </View>

                                <Text 
                                    style={[
                                        styles.transactionType, 
                                        item.type_transaction === 'achat' ? styles.transactionBuy : styles.transactionSell
                                    ]}
                                >
                                    {item.type_transaction}
                                </Text>

                                <Text style={styles.transactionCrypto}>{item.cryptoSymbol}</Text>
                                <Text style={styles.transactionQuantity}>Quantité: {item.quantite}</Text>
                                <Text style={styles.transactionPrice}>Prix Total: ${item.prix_total.toLocaleString()}</Text>

                                <View style={styles.dateTimeContainer}>
                                    <Text style={styles.transactionDate}>{formattedDate}</Text>
                                    <Text style={styles.transactionTime}>{formattedTime}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f6f9',
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    transaction: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    transactionType: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    transactionBuy: {
        backgroundColor: '#28a745',
        color: '#fff',
    },
    transactionSell: {
        backgroundColor: '#dc3545',
        color: '#fff',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    transactionDate: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: 'bold',
    },
    transactionTime: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: 'bold',
    },
    transactionCrypto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f39c12', // Couleur dorée pour symboliser la crypto
        textAlign: 'center',
        marginBottom: 5,
    },
    transactionQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2980b9', // Bleu pour la lisibilité
        textAlign: 'center',
    },
    transactionPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60', // Vert pour symboliser l'argent
        textAlign: 'center',
    },    
});

export default Portefeuille;
