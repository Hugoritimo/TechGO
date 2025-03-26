import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfile = () => {
  // Em uma implementação real, os dados podem vir do backend ou do estado global
  return (
    <View style={styles.profileContainer}>
      <Image 
        source={{ uri: 'https://example.com/sua-imagem.jpg' }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>João Silva</Text>
        <Text style={styles.points}>Pontos: 120</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    color: '#555',
  },
});

export default UserProfile;
