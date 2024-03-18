import { View, Text } from "react-native";
import React, { useEffect } from "react";

export default function ResultDetails({ navigation }) {
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);
  return (
    <View>
      <Text>ResultDetails</Text>
    </View>
  );
}
