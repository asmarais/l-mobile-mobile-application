import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import CalendarScreen from "../Screens/CalendarScreen/CalendarScreen";
import CalendarDetails from "../Screens/CalendarScreen/CalendarDetails";

export default function CalendarStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Events"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Event Details" component={CalendarDetails} />
    </Stack.Navigator>
  );
}
