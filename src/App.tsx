import React from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { AppNavigator } from "@navigation";

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
