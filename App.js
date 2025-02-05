import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import SideBar from './components/util/SideBar';
import CoursCrypto from './components/crypto/CoursCrypto';
import Operation from './components/transaction/Operation';
import Portefeuille from './components/crypto/Portefeuille';
import Notifications from './components/util/Notifications';

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
      <Drawer.Screen name="Cours Crypto" component={CoursCrypto} />
      <Drawer.Screen name="Mon Portefeuille" component={Portefeuille} />
      <Drawer.Screen name="Operation" component={Operation} />
      <Drawer.Screen name="Mes Notifications" component={Notifications} />

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
