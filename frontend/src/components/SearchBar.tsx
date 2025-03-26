// src/components/OSMSearchBar.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type OSMSearchBarProps = {
  onLocationSelect: (lat: number, lng: number, displayName: string) => void;
};

const OSMSearchBar: React.FC<OSMSearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      // Consulta à API Nominatim
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`, {
        headers: {
          "User-Agent": "TechGOMobile/1.0", // importante para identificar seu app
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPredictions(data);
        })
        .catch((error) => {
          console.error("Erro na busca OSM:", error);
        });
    } else {
      setPredictions([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Para onde?"
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
      />
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setQuery(item.display_name);
                setPredictions([]);
                onLocationSelect(parseFloat(item.lat), parseFloat(item.lon), item.display_name);
              }}
            >
              <Text style={styles.itemText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  list: {
    marginTop: 5,
    maxHeight: 150,
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default OSMSearchBar;
