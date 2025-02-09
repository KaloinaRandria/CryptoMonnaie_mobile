import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig'; // Vérifie le chemin correct

const CoursCrypto = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

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
        fetchCryptos();
        const intervalId = setInterval(() => {
            fetchCryptos();
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
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
                        <Text style={styles.priceCell}>{item.prix_unitaire} $</Text>
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
        backgroundColor: '#f4f6f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
    priceCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60', // Vert pour le prix
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CoursCrypto;
