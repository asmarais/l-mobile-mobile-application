import { FlatList, View, ScrollView, Animated } from "react-native";
import React from "react";
import ResultsHeader from "./ResultsHeader";
import ResultsElement from "./ResultsElement";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultsScreen() {
  {
    /*After that change it with the data from DB*/
  }
  const navigation = useNavigation();

  const handlePress = (title) => {
    navigation.navigate("Details", { title });
  };
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
    { id: "6", title: "Item 6" },
    { id: "7", title: "Item 7" },
    { id: "8", title: "Item 8" },
    { id: "9", title: "Item 9" },
    { id: "10", title: "Item 10" },
  ];
  const renderItem = ({ item }) => (
    <ResultsElement title={item.title} handlePress={handlePress} />
  );
  const topMargin =
    Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ResultsHeader />
      {/*This need to be changed when I fetch the data from the database*/}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
