import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.6:5207/api/";
//const BASE_URL = "http://192.168.1.4:5207/api/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...authHeader(),
  },
});

function authHeader() {
  const token = AsyncStorage.getItem("Token");
  console.log(token);
  let result = {};
  if (token) {
    result = `Bearer ${token}`;
    return { Authorization: result };
  } else {
    return result;
  }
}

export default api;
