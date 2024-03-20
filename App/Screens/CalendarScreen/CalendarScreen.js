import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import CalendarHeader from "./CalendarHeader";
import { useNavigation } from "@react-navigation/native";
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
    <SafeAreaView>
      <CalendarHeader />
      <Calendar
        style={styles.calendar} /*markedDates={this.state.markedDates}*/
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markedDates={markedDates}
      />
      <Text>Future Events</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
  },
});
