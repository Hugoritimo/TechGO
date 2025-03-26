// src/pages/MarketScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Notebook Gamer",
    price: 5500,
    image: "https://via.placeholder.com/300x200.png?text=Notebook",
  },
  {
    id: "2",
    name: "Smartphone",
    price: 1500,
    image: "https://via.placeholder.com/300x200.png?text=Smartphone",
  },
  {
    id: "3",
    name: "Headset Bluetooth",
    price: 350,
    image: "https://via.placeholder.com/300x200.png?text=Headset",
  },
  // Adicione mais produtos se desejar
];

export default function MarketScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Mercado de Eletrônicos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f1f1" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    color: "#666",
    marginBottom: 5,
  },
  buyButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
