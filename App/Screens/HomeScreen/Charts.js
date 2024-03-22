import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Charts() {
  return (
    <View style={styles.container}>
      <Text style={styles.performanceText}>Performance</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "45%",
    backgroundColor: "white",
  },
  performanceText: {
    fontWeight: "bold",
    margin: 24,
    fontSize: 18,
  },
});
