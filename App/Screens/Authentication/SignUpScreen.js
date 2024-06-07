import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { theme } from "../../Theme";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { signUp } = useContext(AuthContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState("female");
  const genderList = ["female", "male"];

  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const isSuccess = await signUp(
          values.firstName,
          values.secondName,
          values.email,
          values.phone,
          values.password
        );
        if (isSuccess) {
          navigation.navigate("Additional", { email: values.email });
        } else {
          console.log("hey");
        }
      } catch (error) {
        console.log("Error during sign up:", error);
      }
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      formik.resetForm();
    }, [])
  );

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <View className="mt-4 p-5">
          <Text
            style={{ color: theme.text, fontSize: wp(8) }}
            className="font-bold text-center"
          >
            Create account
          </Text>
        </View>
        <View className="pl-4 mb-4">
          <Text className="text-center font-medium" style={{ fontSize: wp(5) }}>
            Unleash Your Potential with Our Marathon App!
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="First name"
            placeholderTextColor="gray"
            style={{
              height: hp(7),
              backgroundColor: "#f3f4f6",
              padding: wp(2),
              borderRadius: 10,
              marginVertical: hp(1),
            }}
            value={formik.values.firstName}
            onChangeText={formik.handleChange("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
              {formik.errors.firstName}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Last name"
            placeholderTextColor="gray"
            style={{
              height: hp(7),
              backgroundColor: "#f3f4f6",
              padding: wp(2),
              borderRadius: 10,
              marginVertical: hp(1),
            }}
            value={formik.values.secondName}
            onChangeText={formik.handleChange("secondName")}
          />
          {formik.touched.secondName && formik.errors.secondName && (
            <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
              {formik.errors.secondName}
            </Text>
          )}
        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={{
            height: hp(7),
            backgroundColor: "#f3f4f6",
            padding: wp(2),
            borderRadius: 10,
            marginVertical: hp(1),
          }}
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
            {formik.errors.email}
          </Text>
        )}

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="gray"
          style={{
            height: hp(7),
            backgroundColor: "#f3f4f6",
            padding: wp(2),
            borderRadius: 10,
            marginVertical: hp(1),
          }}
          value={formik.values.phone}
          onChangeText={formik.handleChange("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
            {formik.errors.phone}
          </Text>
        )}

        <View
          style={{
            height: hp(7),
            backgroundColor: "#f3f4f6",
            padding: wp(2),
            borderRadius: 10,
            marginVertical: hp(1),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            style={{ flex: 1 }}
            secureTextEntry={!showPassword}
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
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
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
            {formik.errors.password}
          </Text>
        )}

        <View
          style={{
            height: hp(7),
            backgroundColor: "#f3f4f6",
            padding: wp(2),
            borderRadius: 10,
            marginVertical: hp(1),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            style={{ flex: 1 }}
            secureTextEntry={!showConfirmPassword}
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
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
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={{ color: "red", fontSize: wp(3), marginLeft: wp(2) }}>
            {formik.errors.confirmPassword}
          </Text>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: theme.text,
            height: hp(7),
          }}
          className="rounded-lg justify-center m-2"
          onPress={formik.handleSubmit}
        >
          <Text
            style={{
              fontSize: wp(5.5),
            }}
            className="text-center text-white font-bold   "
          >
            Next
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text>Already have an account? </Text>
          <Text
            className="font-medium"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
