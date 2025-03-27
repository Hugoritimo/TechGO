// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import MapaScreen from "./src/pages/MapaScreen";
import UberLikeHome from "./src/pages/home";
import MarketScreen from "./src/pages/MarketScreen";

// 1. Importe as novas telas de formulário
import SuporteRedeScreen from "./src/pages/rede"; 

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  GPS: undefined;
  Home: undefined;
  Market: undefined;

  // 2. Declare aqui as rotas
  SuporteRede: undefined;
  LimpezaPC: undefined;
  Formatacao: undefined;
  Celular: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GPS" component={MapaScreen} />
        <Stack.Screen name="Home" component={UberLikeHome} />
        <Stack.Screen name="Market" component={MarketScreen} />

        {/* 3. Registre cada rota de formulário */}
        <Stack.Screen name="SuporteRede" component={SuporteRedeScreen} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}
