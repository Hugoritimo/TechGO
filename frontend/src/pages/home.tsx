import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const { width } = Dimensions.get("window");

// Define o tipo de navegação para a tela Home
type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Home">;

// Estrutura de dados para animar ícones
const iconData = [
  { label: "Solicitar Técnico", icon: "directions-car", route: "GPS" },
  { label: "Transporte", icon: "local-shipping", route: "" },
  { label: "Histórico", icon: "schedule", route: "" },
  { label: "Promo", icon: "local-offer", route: "" },
];

export default function UberLikeHome() {
  const navigation = useNavigation<NavigationProps>();

  // Animação geral (fade in) e animação sequencial para ícones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const iconAnimArr = iconData.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Animação de fade-in do ScrollView
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Animação em cascata para cada ícone
    iconAnimArr.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Renderização dos ícones com animação
  const renderIcons = () => {
    return (
      <View style={styles.iconsRow}>
        {iconData.map((item, index) => {
          const iconOpacity = iconAnimArr[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });
          const iconTranslate = iconAnimArr[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          });

          return (
            <Animated.View
              key={item.label}
              style={{
                alignItems: "center",
                opacity: iconOpacity,
                transform: [{ translateY: iconTranslate }],
              }}
            >
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  if (item.route) {
                    navigation.navigate(item.route as never);
                  } else {
                    // Caso queira adicionar outra rota ou ação
                  }
                }}
              >
                <MaterialIcons name={item.icon} size={30} color="#555" />
                <Text style={styles.iconLabel}>{item.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho com tabs */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]} onPress={() => {}}>
          <Text style={styles.tabTextActive}>Viagens</Text>
        </TouchableOpacity>

        {/* Botão Mercado redirecionando para Market */}
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("Market")}>
          <Text style={styles.tabText}>Mercado</Text>
        </TouchableOpacity>
      </View>

      {/* Ícones Principais (Viagem, Envios, Reserve, Promo) */}
      {renderIcons()}

      {/* Card de promoção principal */}
      <View style={styles.promoCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/300x150.png?text=Promo" }}
          style={styles.promoImage}
        />
        <View style={styles.promoInfo}>
          <Text style={styles.promoTitle}>Economize com a TechGO</Text>
          <Text style={styles.promoSubtitle}>Atendimento de Técnicos especializados em sua casa</Text>
        </View>
      </View>

      {/* Card de convite / outro banner */}
      <View style={styles.inviteCard}>
        <Text style={styles.inviteTitle}>Pague as viagens de quem ama</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Enviar convite</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de serviços adicionais */}
      <Text style={styles.sectionTitle}>Mais formas de usar a TechGO</Text>
      <View style={styles.extraRow}>
        <ExtraServiceCard
          title="Suporte em Rede"
          description="Problemas de internet? Resolva rápido."
          icon="wifi"
          onPress={() => navigation.navigate("SuporteRede")}
        />
        <ExtraServiceCard
          title="Limpeza de PC"
          description="Deixe seu computador rodando liso."
          icon="computer"
          onPress={() => navigation.navigate("LimpezaPC")}
        />
      </View>
      <View style={styles.extraRow}>
        <ExtraServiceCard
          title="Formatação"
          description="Novo sistema, tudo zerado."
          icon="settings"
          onPress={() => navigation.navigate("Formatacao")}
        />
        <ExtraServiceCard
          title="Celular"
          description="Conserte seu celular ou tablet."
          icon="phone-android"
          onPress={() => navigation.navigate("Celular")}
        />
      </View>
    </Animated.ScrollView>
  );
}

function ExtraServiceCard({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.extraCard} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#3498db" style={styles.extraIcon} />
      <View style={styles.extraInfo}>
        <Text style={styles.extraTitle}>{title}</Text>
        <Text style={styles.extraDesc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    flexDirection: "row",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabButton: {
    marginRight: 20,
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  tabTextActive: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  iconButton: {
    alignItems: "center",
    width: 70,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  promoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  promoImage: {
    width: 120,
    height: 120,
  },
  promoInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  inviteCard: {
    backgroundColor: "#ccefff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    padding: 15,
  },
  inviteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inviteButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  inviteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    color: "#333",
  },
  extraRow: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  extraCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 10,
    elevation: 2,
  },
  extraIcon: {
    marginRight: 10,
  },
  extraInfo: {
    flex: 1,
  },
  extraTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  extraDesc: {
    fontSize: 12,
    color: "#555",
  },
});