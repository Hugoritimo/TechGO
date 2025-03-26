// src/screens/MapaScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { Input, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default function MapaScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (loc) => {
          setLocation(loc);
        }
      );
      return () => subscription.remove();
    })();
  }, []);

  const region: Region = {
    latitude: location ? location.coords.latitude : 37.78825,
    longitude: location ? location.coords.longitude : -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      {/* Mapa em tela cheia */}
      <MapView style={styles.map} initialRegion={region} region={region}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
          />
        )}
      </MapView>

      {/* Cabeçalho com gradiente e barra de pesquisa moderna */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "transparent"]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }}
        >
          <Input
            variant="filled"
            placeholder="Para onde?"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
            bg="rgba(255,255,255,0.3)"
            borderRadius={8}
            py={2}
            px={3}
            _focus={{ bg: "rgba(255,255,255,0.5)" }}
            InputLeftElement={
              <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="white" />
            }
            style={styles.searchInput}
          />
        </LinearGradient>
      </View>

      {/* Painel inferior permanece o mesmo */}
      <View style={styles.bottomPanel}>
        <LinearGradient
          colors={["#ffffff", "#f8f8f8"]}
          style={styles.bottomGradient}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }}
        >
          <Text style={styles.panelTitle}>Solicitar Suporte Técnico</Text>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.buttonText}>Chamar Técnico</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
  searchInput: {
    color: "#fff",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 10,
  },
  bottomGradient: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  requestButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
