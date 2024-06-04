import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";

export default function Registration() {
  const route = useRoute();
  const { eventData } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity className="space-y-2 ">
      <View className="pl-6 mt-2">
        <View className="flex-row ">
          <Text
            style={{ fontSize: wp(5) }}
            className="flex-1 font-bold text-left"
          >
            {item.eventName}
          </Text>
        </View>
        <Text style={{ fontSize: wp(3), color: "gray" }}>
          {item.startDate.split("T")[0]} {" at "}{" "}
          {item.startTime.substring(0, 5)}
        </Text>
      </View>
      <View className="bg-gray-300" style={{ height: hp(0.1) }}></View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={eventData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
