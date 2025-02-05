import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profil = () => {
    const [profileImage, setProfileImage] = useState(require('./../../assets/default-profil.png')); // Image par défaut
    const userName = "John"; // Nom de l'utilisateur
    const userSurname = "Doe"; // Prénom de l'utilisateur

    const handleChangeProfileImage = async () => {
        // Demander les permissions pour l'appareil photo et la galerie
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie pour changer la photo de profil.');
            return;
        }

        // Demander la permission d'utiliser l'appareil photo
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
            Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à l\'appareil photo pour changer la photo de profil.');
            return;
        }

        // Ouvrir l'appareil photo
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) { // Si l'utilisateur n'a pas annulé la prise de photo
            setProfileImage({ uri: result.assets[0].uri });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={profileImage} style={styles.profileImage} />
                <Text style={styles.name}>{userName} {userSurname}</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleChangeProfileImage}>
                    <Text style={styles.editButtonText}>Modifier</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profil;
