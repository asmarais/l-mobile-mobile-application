import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import Participantrun from "../Screens/HomeScreen/Participantrun";
import EventsList from "../Screens/CalendarScreen/EventsList";
import Barcode from "../Screens/HomeScreen/BarCode";
import Registration from "../Screens/HomeScreen/Registration";
import CalendarScreen from "../Screens/CalendarScreen/CalendarScreen";

export default function HomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Events"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: "Welcome",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="Participant run" component={Participantrun} />
      <Stack.Screen name="Event List" component={EventsList} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="RegistrationDetails" component={Registration} />

      <Stack.Screen
        name="Camera"
        component={Barcode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
