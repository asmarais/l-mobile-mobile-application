import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function Slider() {
  /*const [slider, setSlider] = useState();
  useEffect(() => {
    getSliders();
  }, []);
  const getSliders=()=> {
    //I should set the images and try to display the slider
  }*/
  return (
    <View style={styles.container}>
      <Text style={styles.performanceText}>Your Events</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    backgroundColor: "lightyellow",
  },
  performanceText: {
    fontWeight: "bold",
    margin: 24,
    fontSize: 18,
  },
});
