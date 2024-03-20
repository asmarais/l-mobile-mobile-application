import React from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "@rneui/themed";

const ResultsSearch = () => {
  return (
    <View>
      {/*Check the adaptability in the IOS*/}
      <SearchBar
        platform="android"
        placeholder="Search. . . "
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
      />
    </View>
  );
};
export default ResultsSearch;
