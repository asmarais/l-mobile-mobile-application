import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";
export default function ResultsElement({ title, handlePress }) {
  return (
    <TouchableOpacity className="space-y-2 " onPress={() => handlePress(title)}>
      <View className="pl-6 mt-2">
        <View className="flex-row ">
          <Text
            style={{ fontSize: wp(5) }}
            className="flex-1 font-bold text-lef"
          >
            {title}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.text}
            className="mr-24"
          />
        </View>
        <Text style={{ fontSize: wp(3), color: "gray" }}>Jan 20</Text>
      </View>
      <View className="bg-gray-300" style={{ height: hp(0.1) }}></View>
    </TouchableOpacity>
  );
}
