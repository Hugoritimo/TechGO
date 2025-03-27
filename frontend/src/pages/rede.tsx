// src/pages/SuporteRedeScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SuporteRedeScreen() {
  const navigation = useNavigation();
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");

  const handleSubmit = () => {
    // Lógica para enviar dados ao backend
    // Por enquanto, só exibimos um alerta:
    Alert.alert(
      "Chamado Enviado",
      `Descrição: ${descricao}\nPrioridade: ${prioridade}`
    );
    // Após enviar, volte para a Home ou outra tela
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Suporte em Rede</Text>

      <Text style={styles.label}>Descrição do Problema</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o problema de rede"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Prioridade</Text>
      <TextInput
        style={styles.input}
        placeholder="Baixa / Média / Alta"
        value={prioridade}
        onChangeText={setPrioridade}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Chamado</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
