import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import HomeScreen from './components/HomeScreen';
import PeopleListScreen from './components/PeopleListScreen';
import SideBar from './components/util/SideBar';
import CoursCrypto from './components/crypto/CoursCrypto';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ Stack pour Auth (Login & Signup)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

// ✅ Drawer pour les écrans principaux
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="PeopleListScreen" component={PeopleListScreen} />
      <Drawer.Screen name="CoursCrypto" component={CoursCrypto} />
    </Drawer.Navigator>
  );
}

// ✅ Navigation principale
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
