import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function CalendarHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All events</Text>
      <EvilIcons name="search" size={24} color="black" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
