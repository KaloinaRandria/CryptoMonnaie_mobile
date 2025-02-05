import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const SideBar = (props) => {
    const navigation = useNavigation();

    const handleLogout = () => {
        console.log("Déconnexion...");
        // Logique de déconnexion ici
        navigation.replace('Login'); // Redirection vers l'écran de connexion
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>Mon Application</Text>
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
