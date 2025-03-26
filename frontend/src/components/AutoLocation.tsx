// src/components/AutoLocation.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function AutoLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão para acesso à localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
        return;
      }

      // Obtém a posição atual
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Opcional: Monitora a posição em tempo real
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // atualiza a cada 5 segundos
          distanceInterval: 1, // ou a cada 1 metro de deslocamento
        },
        (loc) => {
          setLocation(loc);
        }
      );

      // Remove a inscrição quando o componente desmontar
      return () => subscription.remove();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
      ) : location ? (
        <Text style={styles.text}>
          Latitude: {location.coords.latitude.toFixed(5)} {"\n"}
          Longitude: {location.coords.longitude.toFixed(5)}
        </Text>
      ) : (
        <Text style={styles.text}>Obtendo localização...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, textAlign: "center" },
});
