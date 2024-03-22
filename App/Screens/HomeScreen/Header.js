import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome, Asma</Text>
      <Ionicons
        name="notifications-outline"
        size={24}
        color="black"
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});
