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

export default function RegistrationDetails({ navigation }) {
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
      <Text>Delete</Text>
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
