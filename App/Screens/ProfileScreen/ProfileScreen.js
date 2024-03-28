import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProfileElement from "./ProfileElement";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import CameraModal from "./CameraModal";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { theme } from "../../Theme";

const Profile = require("../../../assets/profile.png");

const topMargin = Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <View className="flex-1 justify-center items-center">
        <View
          style={{ height: hp(25) }}
          className="justify-center items-center m-5"
        >
          <View
            className="rounded-full border-gray-300"
            style={{ height: 130, width: 130 }}
          >
            <Image source={Profile} className="w-full h-full border-2" />
            <TouchableOpacity
              className="rounded-full p-2 absolute right-1 bottom-1 bg-gray-300"
              onPress={() => setModalVisible(true)}
            >
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/*My Modal*/}

          <CameraModal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <Text className="text-center font-bold" style={{ fontSize: wp(6) }}>
              Profile Photo
            </Text>
            <View className="flex-row justify-center mt-4 mb-2">
              <View
                className="justify-center items-center mx-3 rounded-xl bg-gray-300"
                style={{ width: wp(18), height: wp(18) }}
              >
                <Feather name="camera" size={24} color={theme.text} />

                <Text>Camera</Text>
              </View>
              <View
                className="justify-center items-center mx-3 rounded-xl bg-gray-300"
                style={{ width: wp(18), height: wp(18) }}
              >
                <FontAwesome name="photo" size={24} color={theme.text} />
                <Text>Gallery</Text>
              </View>
              <View
                className="justify-center items-center mx-3 rounded-xl bg-gray-300"
                style={{ width: wp(18), height: wp(18) }}
              >
                <Feather name="trash-2" size={24} color="black" />
                <Text>Remove</Text>
              </View>
            </View>
          </CameraModal>

          {/*End of My Modal*/}
          <Text className="mt-5 font-bold" style={{ fontSize: wp(7) }}>
            User
          </Text>
          <Text className="text-gray-500">user.user@gmail.com</Text>
        </View>

        <TouchableOpacity
          style={{ height: wp(10), width: wp(90) }}
          className="bg-gray-200 mt-4 mx-auto justify-center items-center rounded-xl"
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text className="font-bold" style={{ fontSize: wp(4.5) }}>
            Edit
          </Text>
        </TouchableOpacity>

        <ProfileElement name="notifications" text="Notifications" />
        <ProfileElement name="help" text="Help" />
        <ProfileElement name="logout" text="Logout" />
      </View>
    </SafeAreaView>
  );
}
