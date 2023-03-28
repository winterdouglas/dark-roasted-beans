import React, { Suspense } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "~store";
import { AppNavigator } from "~navigation";
import { LoadingIndicator } from "~components/LoadingIndicator";

const App = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
