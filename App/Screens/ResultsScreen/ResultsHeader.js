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
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: wp(5),
        }}
      >
        <Text
          style={{
            fontSize: wp(5),
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Marathons
        </Text>
        <TouchableOpacity>
          <EvilIcons name="search" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View className="mx-5 mb-6">
        <SearchBar placeholder="Search" platform={plat} />
      </View>
    </View>
  );
}
