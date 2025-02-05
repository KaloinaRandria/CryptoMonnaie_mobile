import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CoursCrypto = () => {
    // Données des cryptos
    const [cryptos, setCryptos] = useState([
        { id: '1', name: 'BTC', oldPrice: 45000, currentPrice: 47000, favorite: false },
        { id: '2', name: 'ETH', oldPrice: 3000, currentPrice: 3200, favorite: false },
        { id: '3', name: 'BNB', oldPrice: 400, currentPrice: 300, favorite: false },
    ]);

    // Fonction pour gérer les favoris
    const toggleFavorite = (id) => {
        setCryptos(cryptos.map(crypto =>
            crypto.id === id ? { ...crypto, favorite: !crypto.favorite } : crypto
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cours des Cryptomonnaies</Text>

            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Crypto</Text>
                <Text style={styles.headerCell}>Ancien Prix</Text>
                <Text style={styles.headerCell}>Variation (%)</Text>
                <Text style={styles.headerCell}>Prix Actuel</Text>
                <Text style={styles.headerCell}>Favoris</Text>
            </View>

            <FlatList
                data={cryptos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const variation = (((item.currentPrice - item.oldPrice) / item.oldPrice) * 100).toFixed(2);
                    return (
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.oldPrice} $</Text>
                            <Text style={[styles.cell, variation >= 0 ? styles.green : styles.red]}>
                                {variation} %
                            </Text>
                            <Text style={styles.cell}>{item.currentPrice} $</Text>
                            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteContainer}>
                                <Text style={item.favorite ? styles.filledStar : styles.emptyStar}>
                                    ★
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
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
    green: {
        color: 'green',
    },
    red: {
        color: 'red',
    },
    favoriteContainer: {
        flex: 1,
        alignItems: 'center',
    },
    filledStar: {
        fontSize: 22,
        color: 'gold',
    },
    emptyStar: {
        fontSize: 22,
        color: '#ccc',
    },
});

export default CoursCrypto;
