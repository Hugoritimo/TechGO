// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import MapaScreen from "./src/pages/MapaScreen";
import UberLikeHome from "./src/pages/home";
import MarketScreen from "./src/pages/MarketScreen"; // nossa nova tela

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  GPS: undefined;
  Home: undefined;
  Market: undefined; // nova rota
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
