import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Api/api";
import RadioButtonGroup from "react-native-radio-buttons-group";
import ModalComponent from "../../comonents/Modal";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function ProfileEdit() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genderList = ["female", "male"];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const email = await AsyncStorage.getItem("Email");

    try {
      const response = await api.get(`Participants/ByEmail?email=${email}`);
      const userData = response.data;
      console.log(userData);
      setUser(userData);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setAge(userData.age.toString());
      setHeight(userData.height.toString());
      setWeight(userData.weight.toString());
      setTshirtSize(userData.tshirtSize);
      setGender(userData.gender);
      setPhone(userData.phone);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSave = async () => {
    const email = await AsyncStorage.getItem("Email");

    console.log(
      firstName,
      lastName,
      phone,
      age,
      height,
      weight,
      tshirtSize,
      gender
    );

    try {
      const response = api.put(
        `Participants/ByEmail?email=${email}
`,
        {
          firstName: firstName,
          secondName: lastName,
          phone: phone,
          age: age,
          height: height,
          weight: weight,
          tshirtSize: tshirtSize,
          gender: gender,
        }
      );
      console.log("User data updated successfully");
      fetchUserData();
      Alert.alert("Success", "User data updated successfully");
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert("Error", "Error updating user data");
    }
  };

  const radioButtonsData = [
    {
      id: "1",
      label: "Male",
      value: "male",
      selected: gender === "male",
    },
    {
      id: "2",
      label: "Female",
      value: "female",
      selected: gender === "female",
    },
  ];

  const handleRadioChange = (selectedButton) => {
    setGender(selectedButton.value);
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View className="form-row">
            <Text>First name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View className="form-row">
            <Text>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View className="form-row">
            <Text>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>
          <View className="form-row">
            <Text>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
          <View className="form-row">
            <Text>Height</Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>
          <View className="form-row">
            <Text>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          <View className="form-row">
            <Text>T-shirt size</Text>
            <Picker
              style={styles.input}
              selectedValue={tshirtSize}
              onValueChange={(itemValue) => setTshirtSize(itemValue)}
            >
              {tshirtSizes.map((size, index) => (
                <Picker.Item key={index} label={size} value={size} />
              ))}
            </Picker>
          </View>
          <View className="form-row">
            <Text>Gender</Text>
            <Picker
              style={styles.input}
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              {genderList.map((gen, index) => (
                <Picker.Item key={index} label={gen} value={gen} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userName: {
    fontSize: wp(4),
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: hp(7),
    backgroundColor: "#f3f4f6",
    padding: wp(2),
    borderRadius: 10,
    marginVertical: hp(1),
  },
  saveButton: {
    backgroundColor: "#007bff",
    height: hp(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: hp(2),
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp(80),
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});
