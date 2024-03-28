import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { theme } from "../../Theme";
import { EvilIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const plat = Platform.OS;
const topMargin = Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

export default function ResultsHeader() {
  const navigation = useNavigation();

  return (
    <View style={{ ...topMargin }}>
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: wp(5),
        }}
      >
        <Text
          style={{
            fontSize: wp(5),
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Marathons
        </Text>
      </View>
      <View
        className=" mt-4 mb-2 bg-gray-300"
        style={{
          height: hp(0.1),
          width: wp(100),
          shadowColor: "gray",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          elevation: 5,
        }}
      ></View>

      <View className="mx-5 mb-6">
        <SearchBar placeholder="Search" platform={plat} />
      </View>
    </View>
  );
}
