import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Header from "./Header";
import Performance from "./Performance";
import Charts from "./Charts";
import Slider from "./Slider";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header />
        <Charts />
        <Slider />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
