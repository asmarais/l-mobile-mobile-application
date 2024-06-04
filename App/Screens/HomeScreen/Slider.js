import React, { useState } from "react";
import {
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Api/api";
import backgroundImage from "../../../assets/background.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";

export default function Slider() {
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState([]);
  const [firstRegistration, setFirstRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRegistration = async () => {
    const storedToken = await AsyncStorage.getItem("Token");
    const storedEmail = await AsyncStorage.getItem("Email");
    setUserToken(storedToken);
    setEmail(storedEmail);
    try {
      const runsResponse = await api.get(
        `ParticipantRuns/GetRunsByParticipant?email=${storedEmail}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setRegistration(runsResponse.data);
      if (runsResponse.data.length > 0) {
        setFirstRegistration(runsResponse.data[0]);
      }
      console.log(runsResponse.data);
    } catch (error) {
      console.error("Error fetching runs:", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchRegistration();
    }, [])
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View className="px-5">
      <View className="space-y-5">
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontSize: wp(5) }}
            className="font-bold text-neutral-700"
          >
            Registered Events
          </Text>
          <TouchableOpacity>
            <Text
              style={{ fontSize: wp(4), color: theme.text }}
              onPress={() =>
                navigation.navigate("Registration", {
                  eventData: registration,
                })
              }
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {firstRegistration ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Participant run", {
                  startDate: firstRegistration.startDate.split("T")[0],
                  startTime: firstRegistration.startTime.substring(0, 5),
                  eventType: firstRegistration.eventType,
                  id: firstRegistration.eventAttributeFK,
                })
              }
              style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
            >
              <Image
                source={{ uri: firstRegistration.imageSrc }}
                style={{
                  width: wp(40),
                  height: wp(24),
                  borderRadius: 10,
                  borderWidth: 1,
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: wp(4), fontWeight: "bold" }}>
                  {firstRegistration.eventName}
                </Text>
                <Text style={{ fontSize: wp(3), color: theme.text }}>
                  {firstRegistration.startDate.split("T")[0]} at{" "}
                  {firstRegistration.startTime.substring(0, 5)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: wp(24),
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: wp(4.5),
                  }}
                >
                  There is no registration yet
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/*Events
      <View className="space-y-2">
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontSize: wp(5) }}
            className="font-bold text-neutral-700"
          >
            Future Events
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Event List")}>
            <Text style={{ fontSize: wp(4), color: theme.text }}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingVertical: 15 }}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity className="flex items-center space-y-2">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center space-y-2">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center space-y-2">
          <Image
            source={backgroundImage}
            style={{ width: wp(35), height: wp(34) }}
            className="rounded-xl"
          />
        </TouchableOpacity>
      </ScrollView>
      */}
    </View>
  );
}
