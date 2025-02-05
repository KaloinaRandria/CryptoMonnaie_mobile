import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Icône de succès et d'échec

const Notifications = () => {
    // Liste des notifications
    const notifications = [
        { id: '1', message: 'Votre retrait du 2025-02-01 09:10', type: 'success', time: '09:10' },
        { id: '2', message: 'Votre dépôt du 2025-01-28 15:45', type: 'success', time: '15:45' },
        { id: '3', message: 'Votre achat de BTC du 2025-01-25 12:30', type: 'success', time: '12:30' },
        { id: '4', message: 'Échec du transfert du 2025-01-20 18:00', type: 'failure', time: '18:00' },
        { id: '5', message: 'Échec de l\'achat de ETH du 2025-01-18 14:15', type: 'failure', time: '14:15' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.notification, item.type === 'failure' ? styles.failureNotification : styles.successNotification]}>
                        {item.type === 'success' ? (
                            <FontAwesome name="check-circle" size={20} color="green" style={styles.icon} />
                        ) : (
                            <FontAwesome name="times-circle" size={20} color="red" style={styles.icon} />
                        )}
                        <Text style={styles.message}>{item.message}</Text>
                        <Text style={styles.time}>{item.time}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        position: 'relative',
    },
    successNotification: {
        backgroundColor: '#e6ffe6',
    },
    failureNotification: {
        backgroundColor: '#ffe6e6',
    },
    icon: {
        marginRight: 10,
    },
    message: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: '#666',
        position: 'absolute',
        bottom: 0,
        right: 10,
    },
});

export default Notifications;