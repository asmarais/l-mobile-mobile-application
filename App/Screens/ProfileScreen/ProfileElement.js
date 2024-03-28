import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../Theme";

export default function ProfileElement({ name, text }) {
  return (
    <TouchableOpacity
      style={{ height: wp(10), width: wp(80) }}
      className="mt-4 rounded-xl mx-5"
    >
      <View className="flex-row  items-center">
        <View
          className="
          bg-gray-200
          rounded-lg items-center justify-center"
          style={{ height: wp(10), width: wp(10) }}
        >
          <MaterialIcons
            name={name}
            size={24}
            className="mx-5"
            color={theme.text}
          />
        </View>
        <Text className="font-medium ml-4" style={{ fontSize: wp(5) }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
