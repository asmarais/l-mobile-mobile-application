import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../Theme";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <View className="mt-10 p-5">
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Login Here
          </Text>
        </View>

        <View className="pl-4">
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Welcome Back You've
          </Text>
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Been missed!
          </Text>
        </View>

        <View className=" items-center m-4">
          <Image
            style={{ height: hp(30), width: wp(90) }}
            source={require("../../../assets/Login.jpg")}
          />
        </View>
        <ScrollView>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={{ height: hp(7) }}
            className="bg-gray-100 p-2 rounded-lg m-2"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {email && !isEmailValid(email) && (
            <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
              Invalid email format
            </Text>
          )}
          <View
            className="bg-gray-100 p-2 rounded-lg m-2 flex-row items-center"
            style={{ height: hp(7) }}
          >
            <TextInput
              placeholder="Password"
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
        </ScrollView>
        {/*<Text className="flex self-end m-2"> Forgot your password?</Text>*/}
        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            height: hp(7),
          }}
          onPress={() => {
            login(email, password);
          }}
          className="rounded-lg justify-center m-2"
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center text-white font-bold  "
          >
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text>Don't have an account? </Text>
          <Text
            className="font-medium"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
