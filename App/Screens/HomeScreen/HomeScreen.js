import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Header from "./Header";
import Performance from "./Performance";
import Charts from "./Charts";
import Slider from "./Slider";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Header />
      <Charts />
      <Slider />
    </View>
  );
};
export default HomeScreen;
