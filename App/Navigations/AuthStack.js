import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomeScreen from "../Screens/Authentication/WelcomeScreen";
import LoginScreen from "../Screens/Authentication/LoginScreen";
import SignUpScreen from "../Screens/Authentication/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import HomeStack from "./HomeStack";
import AdditionalInformation from "../Screens/Authentication/AdditionalInformation";

export default function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="Additional"
        component={AdditionalInformation}
        options={{
          headerShown: true,
          headerTitle: "You",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
