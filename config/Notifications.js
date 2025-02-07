import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';

// ✅ Configuration du comportement des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ✅ Fonction pour demander les permissions et obtenir le token
export async function registerForPushNotificationsAsync() {
  let token;

//   if (!Constants.isDevice) {
//     Alert.alert('Erreur', 'Les notifications ne fonctionnent que sur un appareil physique.');
//     return;
//   }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Erreur', 'Permission de notifications refusée.');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// ✅ Fonction pour envoyer une notification locale
export async function sendLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔔 Nouvelle Notification !',
      body: 'Ceci est une notification test avec Expo.',
      sound: 'default',
    },
    trigger: null, // Envoyer immédiatement
  });
}

// ✅ Fonction pour gérer la réponse aux notifications
export function handleNotificationResponse(response) {
  console.log('Notification cliquée:', response);
}
