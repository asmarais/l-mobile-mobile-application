import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text>ProfileScreen1</Text>
    </View>
  );
}
