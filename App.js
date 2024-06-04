import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./App/context/AuthContext";
import AppNav from "./App/Navigations/AppNav";
function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
export default App;
