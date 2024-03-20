import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { theme } from "../../Theme";
import { EvilIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const topMargin = Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

export default function ResultsHeader() {
  return (
    <View>
      <View className="mx-5 flex-row justify-center items-center mb-8">
        <Text
          style={{ fontSize: wp(7), color: theme.text }}
          className="font-bold"
        >
          Marathons
        </Text>
      </View>
      <View className="mx-5 mb-6">
        <View className="flex-row items-center bg-neutral-100 p-2 space-x-2 pl-6 rounded-lg">
          <EvilIcons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search Event"
            placeholderTextColor={"gray"}
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
          />
        </View>
      </View>
    </View>
  );
}
