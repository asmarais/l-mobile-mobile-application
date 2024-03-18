import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResultsHeader from "./ResultsHeader";
import ResultsFilter from "./ResultsFilter";
import ResultsElement from "./ResultsElement";

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#fff" }}>
      <ResultsHeader />
      <ResultsFilter />
      {/*A for loop to retrieve all the information*/}
      <ResultsElement />
    </View>
  );
}