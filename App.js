import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { View, Text } from "react-native";
import AuthStack from "./App/Navigations/AuthStack";
import WelcomeScreen from "./App/Screens/Authentication/WelcomeScreen";
function App() {
  return (
    //SafeAreaProvider is an expo component => prevents the elements to be on the phone nav bar
    <NavigationContainer>
      <AuthStack />

      {/*
            <TabNavigation />

      */}
    </NavigationContainer>
  );
}
export default App;
