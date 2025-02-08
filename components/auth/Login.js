import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import de l'icône
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import des fonctions Firebase
import { auth, firestore } from '../../config/firebaseConfig'; // Assure-toi que le chemin est correct
import { doc, getDoc } from 'firebase/firestore'; // Import pour accéder à Firestore

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  // État pour gérer le chargement

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez entrer un email et un mot de passe.");
            return;
        }

        setLoading(true);  // Démarre le chargement
        console.log("Tentative de connexion avec :", email, password);  // 🔍 Debug

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Utilisateur connecté :", userCredential.user.email);
            
            // Récupérer l'utilisateur dans Firestore par son email
            const userDocRef = doc(firestore, 'utilisateurs', email); // Utilise l'email comme ID de document
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                // Récupérer les données de l'utilisateur (exemple : solde)
                const userData = userDocSnap.data();
                console.log("Données de l'utilisateur récupérées :", userData);
                
                // Ajouter les données de l'utilisateur dans AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                
                // Rediriger vers la page principale
                navigation.navigate('Main');
            } else {
                Alert.alert('Erreur', "L'utilisateur n'existe pas dans la base de données.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
        } finally {
            setLoading(false);  // Arrête le chargement une fois la connexion terminée
        }
    };

    const handleSignUp = () => {
        console.log('Redirection vers inscription');
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CryptoMonnaie</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Mot de passe"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
                    <Ionicons 
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={24} 
                        color="#555" 
                    />
                </TouchableOpacity>
            </View>

            {/* Affichage du loader quand la connexion est en cours */}
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
            ) : (
                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]} 
                    onPress={handleLogin} 
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingRight: 10,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 10,
    },
    linkText: {
        color: '#007bff',
        fontSize: 16,
    },
    loader: {
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    }
});

export default Login;
