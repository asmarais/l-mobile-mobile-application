import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import ModalComponent from "../../comonents/Modal";
import { theme } from "../../Theme";
import { AuthContext } from "../../context/AuthContext";

const Profile = require("../../../assets/profile.png");

const topMargin = Platform.OS === "ios" ? { marginTop: 3 } : { marginTop: 15 };

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { logout, deleteAccount } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("Email");
      setEmail(storedEmail);
    };
    fetchEmail();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: hp(25),
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <View
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
              backgroundColor: "#f3f4f6",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={Profile}
              style={{ width: "100%", height: "100%", borderRadius: 65 }}
            />
            {/*
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                backgroundColor: "#f3f4f6",
                borderRadius: 15,
                padding: 5,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
          */}
          </View>
          {/*
          <ModalComponent
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: wp(6),
              }}
            >
              Profile Photo
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  borderRadius: 10,
                  backgroundColor: "#f3f4f6",
                  width: wp(18),
                  height: wp(18),
                }}
              >
                <Feather name="camera" size={24} color={theme.text} />
                <Text>Camera</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  borderRadius: 10,
                  backgroundColor: "#f3f4f6",
                  width: wp(18),
                  height: wp(18),
                }}
              >
                <FontAwesome name="photo" size={24} color={theme.text} />
                <Text>Gallery</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                  borderRadius: 10,
                  backgroundColor: "#f3f4f6",
                  width: wp(18),
                  height: wp(18),
                }}
              >
                <Feather name="trash-2" size={24} color="black" />
                <Text>Remove</Text>
              </View>
            </View>
          </ModalComponent>
          */}

          <Text style={{ color: "gray", marginTop: 10 }}>{email}</Text>
        </View>

        <TouchableOpacity
          style={{
            height: wp(10),
            width: wp(90),
            backgroundColor: "#f3f4f6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text style={{ fontWeight: "bold", fontSize: wp(4.5) }}>Edit</Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity
          style={{
            height: wp(10),
            width: wp(80),

            borderRadius: 10,
            marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: wp(10),
              width: wp(10),
              backgroundColor: "#f3f4f6",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <MaterialIcons name="help" size={24} color={theme.text} />
          </View>
          <Text style={{ fontSize: wp(5), marginLeft: 10 }}>Help</Text>
        </TouchableOpacity>
*/}

        <TouchableOpacity
          style={{
            height: wp(10),
            width: wp(80),

            borderRadius: 10,
            marginVertical: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Change Password");
          }}
        >
          <View
            style={{
              height: wp(10),
              width: wp(10),
              backgroundColor: "#f3f4f6",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Ionicons name="lock-closed" size={24} color={theme.text} />
          </View>
          <Text style={{ fontSize: wp(5), marginLeft: 10 }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: wp(10),
            width: wp(80),

            borderRadius: 10,
            marginVertical: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            logout();
          }}
        >
          <View
            style={{
              height: wp(10),
              width: wp(10),
              backgroundColor: "#f3f4f6",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <MaterialIcons name="logout" size={24} color={theme.text} />
          </View>
          <Text style={{ fontSize: wp(5), marginLeft: 10 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          height: wp(10),
          width: wp(90),
          backgroundColor: "#ec4856",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginVertical: 10,
          marginBottom: 36,
          alignSelf: "center",
        }}
        onPress={() => {
          deleteAccount(email);
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: wp(4.5), color: "white" }}>
          Delete account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
