import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../Theme";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 mx-4 bg-white">
      <View className=" items-center">
        <Image
          style={{ height: hp(60), width: wp(100) }}
          source={require("../../../assets/Welcome.jpg")}
        />
        <View className="mb-4">
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Discover Your
          </Text>
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Running Passion
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-center font-medium" style={{ fontSize: wp(4) }}>
            Empowering Every Runner, One Step at a Time
          </Text>
          <Text className="text-center font-medium" style={{ fontSize: wp(4) }}>
            Your Marathon Journey Starts Here!
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            width: wp(40),
            height: hp(7),
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
          className="rounded-lg justify-center mr-2"
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center text-white font-bold  "
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp(40),
            height: hp(7),
          }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          className="rounded-lg justify-center"
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center font-bold  "
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
