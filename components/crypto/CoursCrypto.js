import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CoursCrypto = () => {
    // Données des cryptos
    const [cryptos, setCryptos] = useState([
        { id: '1', name: 'BTC', oldPrice: 45000, currentPrice: 47000, favorite: 0 },
        { id: '2', name: 'ETH', oldPrice: 3000, currentPrice: 3200, favorite: 0 },
        { id: '3', name: 'BNB', oldPrice: 400, currentPrice: 410, favorite: 0 },
    ]);

    // Fonction pour gérer les favoris
    const toggleFavorite = (id, stars) => {
        setCryptos(cryptos.map(crypto =>
            crypto.id === id ? { ...crypto, favorite: stars } : crypto
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
                            <View style={styles.favoriteContainer}>
                                {[...Array(5)].map((_, index) => (
                                    <TouchableOpacity key={index} onPress={() => toggleFavorite(item.id, index + 1)}>
                                        <Text style={index < item.favorite ? styles.filledStar : styles.emptyStar}>★</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filledStar: {
        fontSize: 18,
        color: 'gold',
    },
    emptyStar: {
        fontSize: 18,
        color: '#ccc',
    },
});

export default CoursCrypto;
