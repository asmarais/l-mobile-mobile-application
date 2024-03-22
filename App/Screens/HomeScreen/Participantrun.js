import React, { useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Participantrun({ navigation }) {
  {
    /*If the status of the event is open then this will be displayed*/
  }
  const [scanResults, setScanResults] = useState([]);

  const handleScannedData = (data, time) => {
    const newScan = { data, time };
    setScanResults([...scanResults, newScan]);
  };
  return (
    <View className="items-center justify-center flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={scanResults}
        renderItem={({ item }) => (
          <View
            className="bg-slate-300 m-2 justify-center rounded-xl items-center "
            style={{ height: wp(20), width: wp(90) }}
          >
            <Text>QR Code: {item.data}</Text>

            <Text>Time: {item.time}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#1C8FE3", height: wp(15), width: wp(50) }}
        className="mb-6 mx-auto flex justify-center items-center rounded-xl"
        onPress={() =>
          navigation.navigate("Camera", {
            handleScannedData: handleScannedData,
          })
        }
      >
        <Text className="text-white font-bold" style={{ fontSize: wp(4.5) }}>
          Scan
        </Text>
      </TouchableOpacity>
    </View>
  );
}
