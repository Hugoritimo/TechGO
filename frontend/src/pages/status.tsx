import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusPanel = () => {
  // Esse componente pode receber props com as informações reais do chamado
  return (
    <View style={styles.panel}>
      <Text style={styles.statusTitle}>Seu chamado está em andamento</Text>
      <Text style={styles.statusDetails}>Tempo estimado: 5 min | Distância: 1.2 km</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    margin: 10,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default StatusPanel;
