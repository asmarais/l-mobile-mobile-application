import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import { FontAwesome, Entypo, AntDesign, Foundation } from "@expo/vector-icons";
import CalendarScreen from "../Screens/CalendarScreen/CalendarScreen";
import ResultsScreen from "../Screens/ResultsScreen/ResultsScreen";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Calendar
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Results
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Foundation name="results" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
