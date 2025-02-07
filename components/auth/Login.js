import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import de l'icône
import axios from 'axios'; // Import d'Axios
import Utilisateur from '../../models/Utilisateur';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        // try {
            // Appel API avec Axios
            // const response = await axios.post('http://172.30.152.207:8080/authMobile', null, {
            //     params: {
            //         mail: email,
            //         mdp: password
            //     }
            // });

            // if (response.status === 200) {
            //     // Logique après une authentification réussie
            //     const user = new Utilisateur(response.data.data.utilisateur.id , response.data.data.utilisateur.nom , 
            //         response.data.data.utilisateur.mail , response.data.data.utilisateur.mdp);

            //     const jeton = response.data.data.jeton

            //     await AsyncStorage.setItem('user', JSON.stringify(user));
            //     await AsyncStorage.setItem('jeton', jeton);
            
            //     console.log('Réponse:', user.nom);
            //     console.log('jeton:', jeton);
                // Rediriger vers la page principale après connexion réussie
                navigation.navigate('Main');
        //     }
        // } catch (error) {
        //     // Gérer les erreurs d'authentification
        //     console.error('Erreur lors de la connexion', error);
        //     Alert.alert('Erreur', 'mail ou mot de passe incorrect.');
        // }
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleSignUp}>
                <Text style={styles.linkText}>S'inscrire</Text>
            </TouchableOpacity>
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
    }
});

export default Login;
