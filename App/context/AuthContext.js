import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Api/api";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [email, setEmail] = useState("");

  const deleteAccount = (email) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            try {
              const response = await api.delete(
                `Participants/ByEmail?email=${email}`
              );
              console.log("Account deleted successfully");
              await AsyncStorage.removeItem("Token");
              setUserToken(null);
              Alert.alert("Success", "Your account has been deleted.");
            } catch (error) {
              console.error("Error removing token:", error);
              Alert.alert(
                "Error",
                "An error occurred while deleting your account."
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const login = (email, password) => {
    setIsLoading(true);
    api
      .post("auth/participant/login", { email, password })
      .then((res) => {
        let userInfo = res.data.accessToken;
        setUserToken(userInfo);
        setEmail(email);
        AsyncStorage.setItem("Token", userInfo);
        AsyncStorage.setItem("Email", email);

        console.log(userInfo);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response && error.response.status === 404) {
          Alert.alert("Login Failed", "Please check your email and password.");
        } else {
          console.log(`Login error ${error}`);
        }
      });
  };
  const signUp = (firstname, lastname, email, phone, password) => {
    setIsLoading(true);
    const obj = {
      email: email,
      firstName: firstname,
      password: password,
      phone: phone,
      secondName: lastname,
    };
    return new Promise((resolve, reject) => {
      api
        .post("auth/participant/register", obj)
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            resolve(true);
          } else {
            resolve(false);
            Alert.alert("Sign Up Failed", "This email exists.");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
          reject(error);
        });
    });
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setIsLoading(true);
            try {
              await AsyncStorage.removeItem("Token");
              setUserToken(null);
            } catch (error) {
              console.error("Error removing token:", error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let accessToken = await AsyncStorage.getItem("Token");
      if (accessToken) {
        setUserToken(accessToken);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signUp,
        isLoading,
        userToken,
        email,
        isLoggedIn,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
