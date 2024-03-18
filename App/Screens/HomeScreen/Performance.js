import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function Performance() {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View>
      <Text style={styles.performanceText}>Performance</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}
const styles = StyleSheet.create({
  performanceText: {
    fontWeight: "bold",
    margin: 24,
    fontSize: 18,
  },
});
