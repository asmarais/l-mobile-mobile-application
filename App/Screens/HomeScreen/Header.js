import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { theme } from "../../Theme";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const plat = Platform.OS;
const topMargin = Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

export default function CalendarHeader() {
  const navigation = useNavigation();

  return (
    <View style={{ ...topMargin }}>
      <View
        className="flex-row justify-between items-center"
        style={{
          paddingHorizontal: wp(5),
        }}
      >
        <Text
          className="text-center mx-auto font-bold"
          style={{
            fontSize: wp(5),
          }}
        >
          Welcome, User
        </Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
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
    </View>
  );
}
