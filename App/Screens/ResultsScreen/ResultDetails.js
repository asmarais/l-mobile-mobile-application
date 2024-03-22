import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import maps from "../../../assets/maps.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../Theme";

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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={maps}
        style={{ width: wp(100), height: hp(55), resizeMode: "cover" }}
      />
      <StatusBar style={"light"} />
      <SafeAreaView className="flex-row justify-between items-center w-full absolute">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-1 rounded-lg m-4"
          style={{ backgroundColor: "rgba(255,255,255, 0.5)" }}
        >
          <Feather name="arrow-left" size={wp(7)} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/*Events description*/}

      <View
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-2 px-5"
        >
          <View className="mb-4 ">
            <Text style={{ fontSize: wp(7) }} className="font-bold flex-1">
              Marathon
            </Text>
            <Text
              style={{ fontSize: wp(4), color: theme.text }}
              className="flex-1"
            >
              Type
            </Text>
          </View>

          <View className="flex justify-between mx-1 ">
            <View className="flex-row space-x-2 items-start mb-4">
              <Feather name="calendar" size={25} color={theme.text} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4) }}
                  className="font-bold text-neutral-700"
                >
                  Tues, 5 March 2024 at 12:30 PM
                </Text>
              </View>
            </View>

            <View className="flex-row space-x-2 items-start mb-4">
              <Feather name="map-pin" size={24} color={theme.text} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4) }}
                  className="font-bold text-neutral-700"
                >
                  Golden Gate Work
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mx-1 mb-4">
            {/*Distance*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  Distance
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  10KM
                </Text>
              </View>
            </View>
            {/*Time*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  Time
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  40:30
                </Text>
              </View>
            </View>
            {/*Time*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  AVG Pace
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  4:30
                </Text>
              </View>
            </View>
          </View>

          {/*Second row*/}

          <View className="flex-row justify-between mx-1">
            {/*Distance*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  Distance
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  10KM
                </Text>
              </View>
            </View>
            {/*Time*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  Time
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  40:30
                </Text>
              </View>
            </View>
            {/*Time*/}
            <View className="flex-row space-x-2 items-start">
              <View className="flex space-y-2">
                <Text
                  className="text-neutral-600 tracking-wide"
                  style={{ fontSize: wp(4.5) }}
                >
                  AVG Pace
                </Text>
                <Text className="font-bold text-neutral-700 text-center">
                  4:30
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: "#1C8FE3", height: wp(15), width: wp(50) }}
          className="mb-6 mx-auto flex justify-center items-center rounded-xl"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(4.5) }}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
