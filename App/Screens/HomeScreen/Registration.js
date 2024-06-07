import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../../Api/api";
import { theme } from "../../Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Registration({ navigation }) {
  const route = useRoute();
  const { eventData } = route.params;

  const [events, setEvents] = useState(eventData);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("Email").then((emailValue) => setEmail(emailValue));
    AsyncStorage.getItem("Token").then((tokenValue) => setToken(tokenValue));
  }, []);

  const deleteEvent = async (eventId) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this registration?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await api.delete(
                `ParticipantRuns/DeleteRun?email=${email}&eventAttributeFk=${eventId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Registration deleted successfully");

              Alert.alert("Success", "Your registration has been deleted.");
              const updatedEvents = events.filter(
                (event) => event.id !== eventId
              );
              setEvents(updatedEvents);

              // Reload the page by refreshing the data
              refreshData();
            } catch (error) {
              console.error("Error removing token:", error);
              Alert.alert(
                "Error",
                "An error occurred while deleting your registration."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const refreshData = () => {
    // Refresh data logic here, such as re-fetching the updated events list
    // You can also directly update state if the data is stored locally and already up-to-date
    // For example:
    // api.getEvents().then((data) => setEvents(data));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="space-y-2">
      <View className="pl-6 mt-2">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: wp(5), fontWeight: "bold" }}>
              {item.eventName}
            </Text>
            <Text>{item.eventType}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteEvent(item.eventAttributeFK)}>
            <MaterialCommunityIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: wp(3), color: "gray" }}>
          {item.startDate.split("T")[0]} at {item.startTime.substring(0, 5)}
        </Text>
      </View>
      <View className="bg-gray-300" style={{ height: hp(0.1) }}></View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
