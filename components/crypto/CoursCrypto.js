import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig'; // Vérifie le chemin correct

const CoursCrypto = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer les cryptos depuis Firestore
    const fetchCryptos = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "crypto-monnaies"));
            const cryptoList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCryptos(cryptoList);
        } catch (error) {
            console.error("Erreur lors de la récupération des cryptos :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch des cryptos
        fetchCryptos();

        // Mettre en place l'intervalle pour rafraîchir toutes les 10 secondes
        const intervalId = setInterval(() => {
            fetchCryptos();
        }, 10000); // 10 000 ms = 10 secondes

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, []); // L'effet se déclenche une seule fois au montage du composant

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cours des Cryptomonnaies</Text>

            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Crypto</Text>
                <Text style={styles.headerCell}>Prix Actuel</Text>
            </View>

            <FlatList
                data={cryptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.designation}</Text>
                        <Text style={styles.cell}>{item.prix_unitaire} $</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CoursCrypto;
