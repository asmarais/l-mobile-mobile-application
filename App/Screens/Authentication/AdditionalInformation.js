import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../Theme";
import api from "../../Api/api";
export default function AdditionalInformation() {
  const navigation = useNavigation();

  const route = useRoute();
  const { email } = route.params;

  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genderList = ["female", "male"];

  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [tshirtSize, setTshirtSize] = useState("M");

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleHeightChange = (text) => {
    setHeight(text);
  };

  const handleTshirtSizeChange = (text) => {
    setTshirtSize(text);
  };

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleSubmit = async () => {
    const formData = {
      gender,
      weight,
      height,
      age,
      tshirtSize,
    };
    console.log(email, formData);

    try {
      const response = await api.put(
        `auth/participant/updateAdditional?email=${email}&age=${age}&gender=${gender}&height=${height}&weight=${weight}&tshirt=${tshirtSize}`
      );
      console.log("Form Data Submitted:", response.data);
      navigation.navigate("Login");
      Alert.alert("You account has been created successfully");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ marginHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingLeft: 16, marginBottom: 16 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: wp(5),
              fontWeight: "500",
            }}
          >
            Tell us a little bit about yourself
          </Text>
        </View>

        <Text style={styles.label}>Enter Your Weight (Kg)</Text>
        <TextInput
          style={{
            backgroundColor: "rgba(243, 244, 246, 0.7)",
            padding: 10,
            borderRadius: 10,
            margin: 10,
          }}
          placeholder="Weight"
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Enter Your Height (cm)</Text>
        <TextInput
          style={{
            backgroundColor: "rgba(243, 244, 246, 0.7)",
            padding: 10,
            borderRadius: 10,
            margin: 10,
          }}
          placeholder="Height"
          value={height}
          onChangeText={handleHeightChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Enter Your Age</Text>
        <TextInput
          style={{
            backgroundColor: "rgba(243, 244, 246, 0.7)",
            padding: 10,
            borderRadius: 10,
            margin: 10,
          }}
          placeholder="Age"
          value={age}
          onChangeText={handleAgeChange}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Enter Your Gender</Text>
        <Picker
          style={{
            backgroundColor: "rgba(243, 244, 246, 0.7)",
            padding: 10,
            borderRadius: 20,
            margin: 10,
          }}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          {genderList.map((gen, index) => (
            <Picker.Item key={index} label={gen} value={gen} />
          ))}
        </Picker>

        <Text style={styles.label}>Enter Your T-shirt Size</Text>
        <Picker
          style={{
            backgroundColor: "rgba(243, 244, 246, 0.7)",
            padding: 10,
            borderRadius: 20,
            margin: 10,
          }}
          selectedValue={tshirtSize}
          onValueChange={(itemValue) => handleTshirtSizeChange(itemValue)}
        >
          {tshirtSizes.map((size, index) => (
            <Picker.Item key={index} label={size} value={size} />
          ))}
        </Picker>

        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            height: hp(7),
          }}
          className="rounded-lg justify-center m-2"
          onPress={handleSubmit}
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center text-white font-bold"
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  label: {
    fontSize: wp(4),
    marginVertical: 8,
    marginLeft: 10,
  },
};
