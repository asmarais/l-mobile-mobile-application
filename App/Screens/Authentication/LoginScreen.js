import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../Theme";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="mx-4">
        <View className="mt-10 p-5">
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Login Here
          </Text>
        </View>

        <View className="pl-4">
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Welcome Back You've
          </Text>
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Been missed!
          </Text>
        </View>

        <View className=" items-center">
          <Image
            style={{ height: hp(40), width: wp(100) }}
            source={require("../../../assets/Login.jpg")}
          />
        </View>
        <ScrollView>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2"
          />
        </ScrollView>
        <Text className="flex self-end m-2"> Forgot your password?</Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            height: hp(7),
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
          className="rounded-lg justify-center m-2"
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
        <View className="flex-row justify-center">
          <Text>Don't have an account? </Text>
          <Text
            className="font-medium"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}
