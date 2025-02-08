import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig';

const Profil = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const IMGUR_CLIENT_ID = "0980b9756ddc695";

    // Récupérer l'email utilisateur depuis AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user.mail) {
                        setEmail(user.mail);
                        setName(user.nom);
                        fetchUserProfile(user.mail);
                    } else {
                        Alert.alert('Erreur', 'Email manquant dans les données utilisateur.');
                    }
                } else {
                    Alert.alert('Erreur', 'Utilisateur non trouvé dans AsyncStorage.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
                Alert.alert('Erreur', 'Une erreur est survenue.');
            }
        };

        fetchUserData();
    }, []);

    // Fonction pour récupérer l'image et le nom de l'utilisateur depuis Firestore
    const fetchUserProfile = async (userEmail) => {
        try {
            const userDocRef = doc(firestore, 'image-utilisateur', userEmail);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                if (data.url) {
                    console.log("Image chargée :", data.url);
                    setProfileImage({ uri: data.url });
                }
                if (data.nom) setName(data.nom);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
        }
    };

    // Fonction pour prendre une photo et mettre à jour Firestore
    const handleChangeProfileImage = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
            Alert.alert('Permission refusée', 'Autorisez l\'accès à l\'appareil photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setProfileImage({ uri: imageUri });

            // Uploader sur Imgur
            const imgurUrl = await uploadToImgur(imageUri);
            if (imgurUrl) {
                await updateByMail(email, imgurUrl);
                fetchUserProfile(email);
            }
        }
    };

    // Fonction pour uploader l'image sur Imgur
    const uploadToImgur = async (imageUri) => {
        try {
            let formData = new FormData();
            formData.append("image", {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });

            const response = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    "Authorization": `Client-ID ${IMGUR_CLIENT_ID}`,
                },
                body: formData,
            });

            const data = await response.json();
            return data.success ? data.data.link : null;
        } catch (error) {
            console.error("Erreur upload Imgur :", error);
            return null;
        }
    };

    // Fonction pour mettre à jour Firestore avec l'URL Imgur
    const updateByMail = async (mail, imgurUrl) => {
        try {
            if (!mail) {
                console.error("Email utilisateur introuvable !");
                return;
            }

            const userDocRef = doc(firestore, 'image-utilisateur', mail);
            await updateDoc(userDocRef, { url: imgurUrl });
            console.log("Image mise à jour avec succès :", imgurUrl);
        } catch (error) {
            console.error("Erreur mise à jour Firestore :", error);
        }
    };

    return (
        <View style={styles.container}>
            {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
            ) : (
                <Image source={require('./../../assets/default-profil.png')} style={styles.profileImage} />
            )}
            <Text style={styles.name}>{name || "Utilisateur inconnu"}</Text> 
            <TouchableOpacity style={styles.editButton} onPress={handleChangeProfileImage}>
                <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
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
