import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function ResultDetails({ navigation }) {
  const route = useRoute();
  const { Result } = route.params;

  const mapViewRef = useRef(null);

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

  const startLocation = {
    latitude: parseFloat(Result.startPositionLatitude),
    longitude: parseFloat(Result.startPositionLongitude),
  };
  const endLocation = {
    latitude: parseFloat(Result.endPositionLatitude),
    longitude: parseFloat(Result.endPositionLongitude),
  };

  useEffect(() => {
    if (mapViewRef.current) {
      mapViewRef.current.fitToCoordinates([startLocation, endLocation], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [startLocation, endLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: (startLocation.latitude + endLocation.latitude) / 2,
          longitude: (startLocation.longitude + endLocation.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={startLocation}
          title="Start Line"
          pinColor="green"
        />
        <Marker coordinate={endLocation} title="Finish Line" pinColor="red" />
        <MapViewDirections
          origin={startLocation}
          destination={endLocation}
          apikey={"apikey"} // Replace with your API key
          strokeWidth={3}
          strokeColor="#FF0000"
          onError={(errorMessage) =>
            console.error("GMaps Directions Error: ", errorMessage)
          }
        />
      </MapView>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            {Result.eventName}
          </Text>
          <Text style={{ fontSize: 18, color: theme.text, marginBottom: 20 }}>
            {Result.eventType}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Feather name="calendar" size={24} color={theme.text} />
            <Text style={{ marginLeft: 10 }}>
              {Result.startDate.split("T")[0]} at{" "}
              {Result.startTime.substring(0, 5)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Feather name="map-pin" size={24} color={theme.text} />
            <Text style={{ marginLeft: 10 }}>Sulzbach an der Murr</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 18 }}>Calories</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {Result.calories.toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>Time</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {Result.time.substring(0, 5)}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>AVG Pace</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {Result.pace.substring(3, 8)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
