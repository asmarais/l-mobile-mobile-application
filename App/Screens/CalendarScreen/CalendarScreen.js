import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import CalendarHeader from "./CalendarHeader";
state = {
  selectedDate: "",
  markedDates: {},
};
export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  /*getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      color: "#00B0BF",
      textColor: "#FFFFFF",
    };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    this.setState({
      selectedDate: serviceDate,
      markedDates: markedDates,
    });
  };
  */
  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <CalendarHeader />
      <Calendar
        style={styles.calendar} /*markedDates={this.state.markedDates}*/
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
