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
            // Supprimer les éléments d'AsyncStorage
            await AsyncStorage.removeItem('user'); // Supprime les données utilisateur
            console.log("Données de l'utilisateur supprimées");
    
            // Réinitialiser la navigation pour revenir à l'écran Login
            navigation.navigate('Auth', {
                screen: 'Login', // Accéder à 'Login' dans le Stack 'Auth'
            });
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };
    


    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>CryptoMonnaie</Text>
            </View>
            
            <DrawerItemList {...props} />
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#d9534f',
        alignItems: 'center',
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SideBar;
