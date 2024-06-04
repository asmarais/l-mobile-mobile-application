import React, { useState } from "react";
import { FlatList, ActivityIndicator, View, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ResultsHeader from "./ResultsHeader";
import ResultsElement from "./ResultsElement";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Api/api";
import { theme } from "../../Theme";

export default function ResultsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        try {
          const token = await AsyncStorage.getItem("Token");
          const email = await AsyncStorage.getItem("Email");
          if (token) {
            const response = await api.get(
              `ParticipantRuns/GetRunsResult?email=${email}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(response.data);
            setData(response.data);
          } else {
            console.error("Token not found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, [])
  );

  const handlePress = (item) => {
    navigation.navigate("Details", { Result: item });
  };

  const renderItem = ({ item }) => (
    <ResultsElement data={item} handlePress={() => handlePress(item)} />
  );

  const topMargin =
    Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, topMargin]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
