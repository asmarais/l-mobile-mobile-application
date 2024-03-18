import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function ResultsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Marathons</Text>
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
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});
