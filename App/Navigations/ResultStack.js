import React from "react";
import ResultDetails from "../Screens/ResultsScreen/ResultDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResultsScreen from "../Screens/ResultsScreen/ResultsScreen";

export default function ResultStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Result"
        component={ResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={ResultDetails}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Stack.Navigator>
  );
}
