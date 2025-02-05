import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Portefeuille = () => {
    // Solde de l'utilisateur
    const [solde, setSolde] = useState(15000); // Exemple de solde en USD

    // Cryptos détenues par l'utilisateur
    const [cryptos, setCryptos] = useState([
        { id: '1', name: 'BTC', quantity: 0.5, price: 47000 },
        { id: '2', name: 'ETH', quantity: 2, price: 3200 },
        { id: '3', name: 'BNB', quantity: 5, price: 410 },
    ]);

    return (
        <View style={styles.container}>
            {/* Solde de l'utilisateur */}
            <Text style={styles.balanceTitle}>Solde Actuel</Text>
            <Text style={styles.balance}>${solde.toLocaleString()}</Text>

            {/* En-tête du tableau */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Crypto</Text>
                <Text style={styles.headerCell}>Quantité</Text>
                <Text style={styles.headerCell}>Prix</Text>
            </View>

            {/* Liste des cryptos détenues */}
            <FlatList
                data={cryptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.name}</Text>
                        <Text style={styles.cell}>{item.quantity}</Text>
                        <Text style={styles.cell}>${(item.quantity * item.price).toLocaleString()}</Text>
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
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Portefeuille;
