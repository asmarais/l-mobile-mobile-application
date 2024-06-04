import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../Theme";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Api/api";
import { useNavigation } from "@react-navigation/native";

const PasswordChange = () => {
  const { changePassword: contextChangePassword } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  useState(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("Email");
      setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  const changePassword = async (email, password) => {
    try {
      const response = await api.put(
        `Participants/ChangePassword?email=${email}&password=${password}`,
        {
          email,
          password,
        }
      );
      Alert.alert("Success", "Password changed successfully.");
      navigation.navigate("ProfileScreen");
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "An error occurred while changing the password.");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[styles.inputContainer, { height: hp(7) }]}>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="gray"
          style={{ flex: 1 }}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={{ paddingHorizontal: wp(2) }}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={wp(6)}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {password && !isPasswordValid(password) && (
        <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
          Password must be at least 6 characters long
        </Text>
      )}

      <View style={[styles.inputContainer, { height: hp(7) }]}>
        <TextInput
          placeholder="Re-type New Password"
          placeholderTextColor="gray"
          style={{ flex: 1 }}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity
          onPress={toggleShowConfirmPassword}
          style={{ paddingHorizontal: wp(2) }}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={wp(6)}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {confirmPassword && password !== confirmPassword && (
        <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
          Passwords do not match
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: theme.text,
          height: hp(7),
        }}
        onPress={() => {
          if (isPasswordValid(password) && password === confirmPassword) {
            changePassword(email, password);
          } else {
            Alert.alert(
              "Error",
              "Please make sure the passwords match and are at least 6 characters long."
            );
          }
        }}
        className="rounded-lg justify-center m-2"
      >
        <Text
          style={{
            fontSize: wp(5.5),
          }}
          className="text-center text-white font-bold"
        >
          Change Password
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PasswordChange;
