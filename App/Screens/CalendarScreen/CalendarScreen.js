import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import CalendarHeader from "./CalendarHeader";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../../../assets/background.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";

state = {
  selectedDate: "",
  markedDates: {},
};
export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();

  const handleDateSelect = (date) => {
    navigation.navigate("Event Details", { date });
    setSelectedDate(date);
    const updatedMarkedDates = {
      [date]: { selected: true, selectedColor: "#009ACD" },
    };
    setMarkedDates(updatedMarkedDates);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CalendarHeader />
        <View
          className="flex flex-1 px-2 mb-8 "
          style={{ width: wp(100), height: hp(50) }}
        >
          <Calendar
            className="rounded-full"
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={markedDates}
          />
        </View>

        <View className="px-5 flex flex-1 justify-between bg-white mt-4">
          <View className="space-y-5">
            <View className=" flex-row justify-between items-center">
              <Text
                style={{ fontSize: wp(5) }}
                className="font-bold text-neutral-700"
              >
                Future Events
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Event List")}
              >
                <Text style={{ fontSize: wp(4), color: theme.text }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 15 }}
            className="space-y-4"
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity className="flex-row space-y-2 mb-2">
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
            <TouchableOpacity className="flex-row space-y-2">
              <Image
                source={backgroundImage}
                style={{ width: wp(40), height: wp(24) }}
                className="rounded-xl"
              />
              <View className="flex mx-4">
                <Text
                  className="text-neutral-700 font-bold mb-2"
                  style={{ fontSize: wp(4), width: wp(50) }}
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
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
