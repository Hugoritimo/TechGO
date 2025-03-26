// src/screens/MapaScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import OSMSearchBar from "../components/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function MapaScreen() {
  const navigation = useNavigation();

  // Estados para localização, precificação e modal
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [techLocation, setTechLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [techLevel, setTechLevel] = useState<"alto" | "medio" | "baixo">("medio");
  const [expressPrice, setExpressPrice] = useState<number>(0);
  const [slowPrice, setSlowPrice] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Estado para animação do header (exemplo de fade-in)
  const headerOpacity = new Animated.Value(0);

  // Obtém a localização do usuário via Expo Location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();

    // Simulação: localização fixa do técnico
    setTechLocation({
      latitude: -23.557,
      longitude: -46.633,
    });
  }, []);

  // Atualiza os preços dinâmicos com base na distância e no nível do técnico
  useEffect(() => {
    if (userLocation && techLocation) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        techLocation.latitude,
        techLocation.longitude
      );
      // Modalidade Expresso: preço calculado + adicional de R$20
      setExpressPrice(calculatePrice(distance, techLevel) + 20);
      setSlowPrice(calculatePrice(distance, techLevel));
    }
  }, [userLocation, techLocation, techLevel]);

  // Inicia animação do header
  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleOption = (option: "express" | "lento") => {
    console.log("Opção selecionada:", option);
    // Integre a lógica de solicitação do chamado com o backend aqui
    closeModal();
  };

  // Define a região do mapa, com fallback para São Paulo
  const region: Region = {
    latitude: userLocation ? userLocation.latitude : -23.5505,
    longitude: userLocation ? userLocation.longitude : -46.6333,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      {/* Mapa de fundo */}
      <MapView style={styles.map} initialRegion={region} region={region}>
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Você está aqui"
          >
            {/* Marker customizado */}
            <MaterialIcons name="person-pin-circle" size={40} color="#3498db" />
          </Marker>
        )}
      </MapView>

      {/* Botão de Voltar para Home */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Header com barra de busca e animação */}
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <OSMSearchBar
            onLocationSelect={(lat, lng, displayName) => {
              console.log("Local selecionado:", displayName);
              setUserLocation({ latitude: lat, longitude: lng });
            }}
          />
        </LinearGradient>
      </Animated.View>

      {/* Bottom panel com botão para chamar o técnico */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.requestButton} onPress={openModal}>
          <Text style={styles.buttonText}>Chamar Técnico</Text>
        </TouchableOpacity>
      </View>

      {/* Modal com as opções de serviço */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Modalidade</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOption("express")}>
              <Text style={styles.optionText}>Expresso (R$ {expressPrice.toFixed(2)})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleOption("lento")}>
              <Text style={styles.optionText}>Lento (R$ {slowPrice.toFixed(2)})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculatePrice(distanceKm: number, technicianLevel: "alto" | "medio" | "baixo"): number {
  const basePrice = 10; // Valor base (R$)
  const costPerKm = 2; // Custo por km (R$)
  let levelMultiplier = 1.0;
  if (technicianLevel === "alto") {
    levelMultiplier = 1.5;
  } else if (technicianLevel === "baixo") {
    levelMultiplier = 0.8;
  }
  return (basePrice + costPerKm * distanceKm) * levelMultiplier;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  backButtonContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 50,
    left: 20,
    zIndex: 11,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 20,
  },
  headerContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  headerGradient: {
    borderRadius: 8,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  requestButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#3498db",
    fontSize: 16,
  },
});
