import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { sendLocalNotification } from '../../config/Notifications';

const NotificationMobile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test des Notifications</Text>
      <TouchableOpacity style={styles.button} onPress={sendLocalNotification}>
        <Text style={styles.buttonText}>Envoyer une Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotificationMobile;
