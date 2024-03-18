import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function ResultsFilter() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>All Events</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>This Month</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#d9d9d9",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
