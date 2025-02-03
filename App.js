import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des composants
import HomeScreen from './components/HomeScreen';
import PeopleListScreen from './components/PeopleListScreen';

// Configuration de la navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="PeopleList" component={PeopleListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
