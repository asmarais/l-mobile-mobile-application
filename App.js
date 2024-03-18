import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
function App() {
  return (
    //SafeAreaProvider is an expo component => prevents the elements to be on the phone nav bar
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
