import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const chamados = [
  { id: '1', status: 'Concluído', data: '10/05/2023', descricao: 'Suporte em rede' },
  { id: '2', status: 'Cancelado', data: '08/05/2023', descricao: 'Suporte em software' },
  // ... outros itens
];

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Chamados</Text>
      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.descricao}</Text>
            <Text style={styles.itemDetails}>{item.data} - {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default HistoryScreen;
