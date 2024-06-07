import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import api from "../../Api/api";
import { theme } from "../../Theme";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        if (token) {
          const response = await api.get("Events", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents(response.data);
          const marked = {};
          response.data.forEach((event) => {
            const date = event.start.split("T")[0];
            marked[date] = { marked: true, selectedColor: "#009ACD" };
          });
          setMarkedDates(marked);
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
  }, []);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    const event = events.find((e) => e.start.split("T")[0] === selectedDate);
    if (event) {
      navigation.navigate("Event Details", { eventData: event });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  const futureEvents = events
    .filter((event) => event.status === "open")
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
      </View>
      <View style={styles.eventsContainer}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsHeaderText}>Future Events</Text>
        </View>
        {futureEvents.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {futureEvents.map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventCard}
                onPress={() =>
                  handleDayPress({ dateString: event.start.split("T")[0] })
                }
              >
                <Image
                  source={{ uri: event.imageSrc }}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.eventName}
                  </Text>
                  <Text style={styles.eventTime}>{event.start}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noEventsText}>No open events yet</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  calendarContainer: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    marginTop: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventsHeaderText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  scrollViewContent: {
    paddingVertical: 15,
  },
  eventCard: {
    flexDirection: "row",
    marginBottom: 16,
  },
  eventImage: {
    width: wp(40),
    height: wp(24),
    borderRadius: 10,
  },
  eventInfo: {
    marginLeft: 16,
    flex: 1,
  },
  eventTitle: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  eventTime: {
    fontSize: wp(3),
    color: "#9B9B9B",
  },
  noEventsText: {
    fontSize: wp(4),
    color: "#9B9B9B",
    textAlign: "center",
    marginTop: 20,
  },
});
