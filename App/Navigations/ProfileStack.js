import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import ProfileEdit from "../Screens/ProfileScreen/ProfileEdit";
import PasswordChange from "../Screens/ProfileScreen/PasswordChange";

export default function ProfileStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Profile" component={ProfileEdit} />
      <Stack.Screen name="Change Password" component={PasswordChange} />
    </Stack.Navigator>
  );
}
