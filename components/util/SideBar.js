import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideBar = (props) => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        console.log("Déconnexion...");
        try {
            await AsyncStorage.removeItem('user'); // Supprime les données utilisateur
            console.log("Données de l'utilisateur supprimées");
            navigation.navigate('Auth', { screen: 'Login' });
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
                {/* Header avec un joli dégradé */}
                <View style={styles.header}>
                    <Text style={styles.title}>CryptoMonnaie</Text>
                </View>

                {/* Liste des éléments du menu */}
                <DrawerItemList {...props} />

                {/* Bouton de déconnexion */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Déconnexion</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>CryptoMonnaie</Text>
                <Text style={styles.footerText}>Fifaliana 2455 - Kaloina 2571 - Hamael 2500</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingVertical: 30,
        backgroundColor: '#2C3E50',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        color: '#ECF0F1',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 20,
        marginHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#E74C3C',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#E74C3C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    logoutText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        padding: 15,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        backgroundColor: '#2C3E50',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    footerText: {
        fontSize: 14,
        color: '#BDC3C7',
    },
});

export default SideBar;
