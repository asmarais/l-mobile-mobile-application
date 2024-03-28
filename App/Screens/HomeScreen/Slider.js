import { Image, Text, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import backgroundImage from "../../../assets/background.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";
import { useNavigation } from "@react-navigation/native";

export default function Slider() {
  const navigation = useNavigation();

  return (
    <View className="px-5">
      <View className="space-y-5">
        <View className=" flex-row justify-between items-center">
          <Text
            style={{ fontSize: wp(5) }}
            className="font-bold text-neutral-700"
          >
            Future Events
          </Text>
          <TouchableOpacity>
            <Text
              style={{ fontSize: wp(4), color: theme.text }}
              onPress={() => navigation.navigate("Registration")}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row space-y-2 mt-2 mb-2"
        onPress={() => navigation.navigate("Participant run")}
      >
        <Image
          source={backgroundImage}
          style={{ width: wp(40), height: wp(24) }}
          className="rounded-xl"
        />
        <View className="flex mx-4">
          <Text
            className="text-neutral-700 font-bold mb-2"
            style={{ fontSize: wp(4), width: wp(40) }}
            numberOfLines={2}
          >
            L- Mobile Marathon Event
          </Text>
          <Text className="text-neutral-500 " style={{ fontSize: wp(3) }}>
            7:00 PM
          </Text>
        </View>
      </TouchableOpacity>

      {/*Try to add multiple images*/}
      <View className="space-y-5">
        <View className=" flex-row justify-between items-center">
          <Text
            style={{ fontSize: wp(5) }}
            className="font-bold text-neutral-700"
          >
            Future Events
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Event List")}>
            <Text style={{ fontSize: wp(4), color: theme.text }}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingVertical: 15 }}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity className="flex items-center space-y-2 ">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center space-y-2 ">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center space-y-2 ">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
