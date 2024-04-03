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

export default function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="mx-4">
        <View className="mt-10 p-5">
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Create account
          </Text>
        </View>

        <View className="pl-4">
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Unleash Your Potential with Our Marathon App!
          </Text>
        </View>
        <ScrollView>
          <View className="flex-row">
            <TextInput
              placeholder="First name"
              placeholderTextColor="gray"
              style={{ height: hp(7), width: wp(40) }}
              className="bg-gray-100 p-2 rounded-lg m-2 mt-4"
            />
            <TextInput
              placeholder="Last name"
              placeholderTextColor="gray"
              style={{ height: hp(7), width: wp(40) }}
              className="bg-gray-100 p-2 rounded-lg m-2 mt-4"
            />
          </View>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2 mt-4"
          />
          <TextInput
            placeholder="Birthday"
            placeholderTextColor="gray"
            style={{ height: hp(7), width: wp(40) }}
            className="bg-gray-100 p-2 rounded-lg m-2 mt-4"
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2 "
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2 "
          />
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            height: hp(7),
          }}
          className="rounded-lg justify-center m-2"
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center text-white font-bold   "
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text>Already have an account? </Text>
          <Text
            className="font-medium"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
