import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import backgroundImage from "../../../assets/background.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../Theme";
import ModalComponent from "../../comonents/Modal";
import api from "../../Api/api";

export default function CalendarDetails({ navigation }) {
  const route = useRoute();
  const { date, eventData } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [eventAttributes, setEventAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [weight, setWeight] = useState("");
  const [tshirtSize, setTshirtSize] = useState("XS");
  const [isRegistered, setIsRegistered] = useState(false);
  const [runs, setRuns] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const eventId = eventData.id;

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userToken = await AsyncStorage.getItem("Token");
        setUserToken(userToken);
        const email = await AsyncStorage.getItem("Email");
        setEmail(email);

        const response = await api.get(`Events/${eventId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setEventAttributes(response.data.attributeObj);

        const runsResponse = await api.get(
          `ParticipantRuns/GetRunsByIDParticipant?email=${email}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        const isRegistered = runsResponse.data.some((run) =>
          response.data.attributeObj.some((attr) => run === attr.id)
        );
        setIsRegistered(isRegistered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventId, userToken, email]);

  const monthNames = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const startDate = eventData.start.split("T")[0];
  const day = startDate.substring(8, 10);
  const month = monthNames[startDate.substring(5, 7)];
  const startTime = eventData.start.split("T")[1].substring(0, 5);
  const endTime = eventData.end.split("T")[1].substring(0, 5);

  const handleRadioChange = (id) => {
    setSelectedAttribute(id);
  };

  const handleSubmit = async () => {
    const obj = {
      email: email,
      eventAttributeID: selectedAttribute,
    };
    try {
      const response = await api.post("ParticipantRuns", obj, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      Alert.alert(
        "Congratulations!",
        "Your registration has been submitted successfully."
      );
      navigation.navigate("Events");
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={{ uri: eventData.imageSrc }}
        style={{ width: wp(100), height: hp(55), resizeMode: "contain" }}
      />
      <StatusBar style={"light"} />
      <SafeAreaView className="flex-row justify-between items-center w-full absolute">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-1 rounded-lg m-4"
          style={{ backgroundColor: "rgba(125,125,125, 0.5)" }}
        >
          <Feather name="arrow-left" size={wp(7)} color={theme.text} />
        </TouchableOpacity>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        className="px-5 flex flex-1 justify-between bg-gray-200 pt-8 -mt-14"
      >
        <Text style={{ fontSize: wp(7) }} className="font-bold mb-4">
          {eventData.eventName}
        </Text>

        <View className="flex-row justify-between mx-1 mb-4">
          <View className="flex-row space-x-2 items-start">
            <Feather name="clock" size={20} />
            <Text
              style={{ fontSize: wp(4) }}
              className=" text-neutral-700 font-bold"
            >
              {startTime} - {endTime}
            </Text>
          </View>

          <View className="flex-row space-x-2 items-start">
            <Feather name="map-pin" size={20} />
            <Text
              style={{ fontSize: wp(4) }}
              className=" text-neutral-700 font-bold"
            >
              Sulzbach an der Murr
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between   mx-1 mb-4">
          <View className="flex space-y-2 items-start">
            <Text
              style={{ fontSize: wp(6), color: theme.text }}
              className="font-bold"
            >
              {day}
            </Text>
            <Text>{month}</Text>
          </View>
          <View className="flex space-y-2 items-start">
            <Text
              style={{ fontSize: wp(6), color: theme.text }}
              className="font-bold"
            >
              Free
            </Text>
            <Text>Price</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
          <Text style={{ fontSize: wp(3.7) }} className="text-neutral-700 mb-4">
            {eventData.description}
          </Text>
        </ScrollView>
        {eventData.status == "closed" ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#1C8FE3",
              height: wp(15),
              width: wp(50),
            }}
            className="mb-6 mx-auto flex justify-center items-center rounded-xl"
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(4.5) }}
            >
              Closed
            </Text>
          </TouchableOpacity>
        ) : isRegistered ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#1C8FE3",
              height: wp(15),
              width: wp(50),
            }}
            className="mb-6 mx-auto flex justify-center items-center rounded-xl"
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(4.5) }}
            >
              You did register
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#1C8FE3",
              height: wp(15),
              width: wp(50),
            }}
            className="mb-6 mx-auto flex justify-center items-center rounded-xl"
            onPress={() => setModalVisible(true)}
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(4.5) }}
            >
              Register now
            </Text>
          </TouchableOpacity>
        )}

        <ModalComponent
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <Text style={styles.title}>Register</Text>
          <Text style={styles.label}>Choose the right plan for you</Text>
          {eventAttributes.map((attribute) => (
            <View key={attribute.id} style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => handleRadioChange(attribute.id)}
              >
                {selectedAttribute === attribute.id && (
                  <View style={styles.radioSelected} />
                )}
              </TouchableOpacity>
              <Text style={styles.radioLabel}>{attribute.type}</Text>
            </View>
          ))}

          <TouchableOpacity
            className="rounded-lg justify-center m-2"
            onPress={handleSubmit}
            style={{
              backgroundColor: theme.text,
              height: hp(7),
            }}
          >
            <Text
              style={{ fontSize: wp(5.5) }}
              className="text-center text-white font-bold"
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ModalComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: wp(6),
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
  },
});
