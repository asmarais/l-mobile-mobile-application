import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Profile = require("../../../assets/profile.png");

export default function ProfileEdit() {
  return (
    <View>
      <Text>ProfileEdit</Text>
      <View style={{ height: hp(25) }} className="flex-row m-5">
        <View className="rounded-full" style={{ height: 130, width: 130 }}>
          <Image source={Profile} className="w-full h-full" />
        </View>
        <Text>User</Text>
      </View>
    </View>
  );
}
