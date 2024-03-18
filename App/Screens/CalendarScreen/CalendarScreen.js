import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
    navigation.navigate("Event Details");
    setSelectedDate(date);
    const updatedMarkedDates = {
      [date]: { selected: true, selectedColor: "#009ACD" },
    };
    setMarkedDates(updatedMarkedDates);
  };
  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <CalendarHeader />
      <Calendar
        style={styles.calendar} /*markedDates={this.state.markedDates}*/
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markedDates={markedDates}
      />
      <Text>Future Events</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
  },
});
