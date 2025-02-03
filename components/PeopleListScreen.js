import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

// Liste des personnes (Page 2)
function PeopleListScreen() {
  const people = [
    { id: '1', name: 'Kaloina' , prenom:'Randria'},
    { id: '2', name: 'Fifaliana' , prenom:'Rabary'},
    { id: '3', name: 'Hamael' , prenom:'Rakoto '},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des personnes :</Text>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.prenom}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 16,
  },
});

export default PeopleListScreen;
