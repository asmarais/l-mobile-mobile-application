import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import backgroundImage from "../../../assets/background.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../Theme";

export default function CalendarDetails({ navigation }) {
  const route = useRoute();
  const { date } = route.params;
  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={backgroundImage}
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
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-2">
          <Text style={{ fontSize: wp(7) }} className="font-bold flex-1">
            Marathon
          </Text>
          <Text
            style={{ fontSize: wp(3.7) }}
            className="text-neutral-700 tracking-wide mb-2"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
            velit sed metus pretium tincidunt.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed quis velit sed metus pretium
            tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed quis velit sed metus pretium tincidunt.
          </Text>
          <View className="flex-row justify-between mx-1">
            <View className="flex-row space-x-2 items-start">
              <Feather name="clock" size={24} color={theme.text} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  9am
                </Text>
                <Text className="text-neutral-600 tracking-wide">Date</Text>
              </View>
            </View>

            <View className="flex-row space-x-2 items-start">
              <Feather name="map-pin" size={24} color={theme.text} />
              <View className="flex space-y-2">
                <Text
                  style={{ fontSize: wp(4.5) }}
                  className="font-bold text-neutral-700"
                >
                  Golden Gate Work
                </Text>
                <Text className="text-neutral-600 tracking-wide">Place</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: "#1C8FE3", height: wp(15), width: wp(50) }}
          className="mb-6 mx-auto flex justify-center items-center rounded-xl"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(4.5) }}>
            Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
