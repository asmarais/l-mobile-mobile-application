import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

export default function ResultDetails({ navigation }) {
  const route = useRoute(); // Use useRoute hook to access the route prop

  // Access the passed title from route.params
  const { title } = route.params;
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
