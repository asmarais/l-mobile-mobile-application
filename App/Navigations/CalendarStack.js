import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import CalendarScreen from "../Screens/CalendarScreen/CalendarScreen";
import CalendarDetails from "../Screens/CalendarScreen/CalendarDetails";
import EventsList from "../Screens/CalendarScreen/EventsList";

export default function CalendarStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Events"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event Details"
        component={CalendarDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Event List" component={EventsList} />
    </Stack.Navigator>
  );
}
