import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig'; 

const Profil = () => {
    const [profileImage, setProfileImage] = useState(require('./../../assets/default-profil.png')); 
    const [email, setEmail] = useState('');
    
    const IMGUR_CLIENT_ID = "0980b9756ddc695"; 

    // Récupérer l'email de l'utilisateur depuis AsyncStorage
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user.mail) {
                        setEmail(user.mail);
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

        fetchUserEmail();
    }, []);

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
                // Mettre à jour Firestore
                await updateByMail(email, imgurUrl);
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

            const q = query(collection(firestore, "image-utilisateur"), where("mail", "==", mail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; // On prend le premier document trouvé
                await updateDoc(userDoc.ref, { url: imgurUrl });
                console.log("Image mise à jour avec succès :", imgurUrl);
            } else {
                console.error("Aucun utilisateur trouvé avec cet email.");
            }
        } catch (error) {
            console.error("Erreur mise à jour Firestore :", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={profileImage} style={styles.profileImage} />
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
