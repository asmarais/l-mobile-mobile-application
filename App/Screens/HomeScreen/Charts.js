import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Circle } from "react-native-progress";
import { theme } from "../../Theme";
import api from "../../Api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function Charts() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const email = await AsyncStorage.getItem("Email");

    api
      .get(`ParticipantRuns/GetRunsResult?email=${email}`)
      .then((response) => {
        const data = response.data;
        setCount(data.length);
        console.log(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  };
  countPoucentage = count / 100;

  return (
    <View style={styles.container}>
      <Text style={styles.performanceText}>Marathon goals</Text>
      <Text style={styles.paragraph}>
        You've run {count} out of 100 marathon
      </Text>
      <View style={styles.circleContainer}>
        <Circle
          size={230}
          progress={countPoucentage}
          showsText={true}
          thickness={10}
          color={theme.text}
          unfilledColor={"#f0f0f0"}
          borderWidth={0}
          textStyle={styles.progressText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
  },
  performanceText: {
    fontWeight: "bold",
    margin: 24,
    fontSize: 18,
  },
  paragraph: {
    marginLeft: 24,
    marginTop: 10,
    marginBottom: 24,
  },

  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 18,
    color: "#3498db",
  },
});
