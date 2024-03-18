import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ResultsElement() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Details");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Monogolia Marathon 2023</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="black"
          style={styles.arrow}
        />
      </View>
      <Text style={styles.lowerText}>Jan 20</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    padding: 10,
    width: "100%",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  arrow: {
    marginRight: 24,
  },
  lowerText: {
    fontSize: 12,
    color: "gray",
  },
});
