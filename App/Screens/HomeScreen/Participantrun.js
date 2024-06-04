import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Geolocation from "@react-native-community/geolocation";

import api from "../../Api/api";
import { Alert } from "react-native";

export default function Participantrun({ navigation }) {
  const route = useRoute();
  const { startDate, startTime, eventType, id } = route.params;
  const Start = "start";
  const TenKm = "10";
  const TwentyKm = "20";
  const HalfMarathon = "HM";
  const ThirtyKm = "30";
  const FortyKm = "40";
  const Marathon = "Marathon";

  const [eventStatus, setEventStatus] = useState(null);
  const [scanResults, setScanResults] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  /*
 useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  */

  const handleScannedData = async (data, time) => {
    const newScan = { data, time };
    const token = await AsyncStorage.getItem("Token");
    const email = await AsyncStorage.getItem("Email");
    if (data == Start) {
      const location = await Location.getCurrentPositionAsync({});
      const runDistance = "start";
      console.log(location);
      if (location) {
        const { latitude, longitude } = location.coords;
        api.put(
          `ParticipantRuns/updateStartPosition?email=${email}&eventAttributeFk=${id}&startPositionLatitude=${latitude}&startPositionLongitude=${longitude}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    if (data == TenKm) {
      const runDistance = "10";
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (eventType == "10km") {
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          const { latitude, longitude } = location.coords;
          api.put(
            `ParticipantRuns/updateStartPosition?email=${email}&eventAttributeFk=${id}&endPositionLatitude=${latitude}&endPositionLongitude=${longitude}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        Alert.alert("Congratulations!", "Your run has been completed");
      }
    }
    if (data == TwentyKm) {
      const runDistance = "20";
      console.log(time);
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    if (data == HalfMarathon) {
      const runDistance = "halfmarathon";
      console.log(time);
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (eventType == "Half Marathon") {
        const location = await Location.getCurrentPositionAsync({});

        if (location) {
          const { latitude, longitude } = location.coords;
          api.put(
            `ParticipantRuns/updateEndPosition?email=${email}&eventAttributeFk=${id}&endPositionLatitude=${latitude}&endPositionLongitude=${longitude}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        Alert.alert("Congratulations!", "Your run has been completed");
      }
    }
    if (data == ThirtyKm) {
      const runDistance = "30";
      console.log(time);
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    if (data == FortyKm) {
      const runDistance = "40";
      console.log(time);
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    if (data == Marathon) {
      const runDistance = "marathon";
      distance = 42;
      console.log(time);
      api.put(
        `ParticipantRuns?email=${email}&eventAttributeFk=${id}&runDistance=${runDistance}&value=${time}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (eventType == "Marathon") {
        const location = await Location.getCurrentPositionAsync({});

        if (location) {
          const { latitude, longitude } = location.coords;
          api.put(
            `ParticipantRuns/updateEndPosition?email=${email}&eventAttributeFk=${id}&endPositionLatitude=${latitude}&endPositionLongitude=${longitude}&distance=${distance}&time=${time}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          Alert.alert("Congratulations!", "Your run has been completed");
          navigation.goBack();
        }
      }
    }
    setScanResults([...scanResults, newScan]);
  };
  useEffect(() => {
    const currentTimeUTC = new Date();
    const todayDate = currentTimeUTC.toISOString().split("T")[0];
    const currentTime = currentTimeUTC.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDate === todayDate) {
      //&& startTime > currentTime) {
      setEventStatus("open");
    } else {
      setEventStatus("upcoming");
    }
  }, [startDate, startTime]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {eventStatus === "open" ? (
        <View>
          <Text>{eventType}</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={scanResults}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#DDDDDD",
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  height: wp(20),
                  width: wp(90),
                }}
              >
                <Text>QR Code: {item.data}</Text>
                <Text>Time: {item.time}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#1C8FE3",
              height: wp(15),
              width: wp(50),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={() =>
              navigation.navigate("Camera", {
                handleScannedData: handleScannedData,
              })
            }
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: wp(4.5) }}
            >
              Scan
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Event is not open, display a message
        <Text>The event will start in a few days.</Text>
      )}
    </View>
  );
}
