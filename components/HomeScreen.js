import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Page principale avec le bouton
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Voir Liste Personne"
        onPress={() => navigation.navigate('PeopleListScreen')}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
