import React, { Suspense } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { Provider } from "react-redux";
import { setupStore } from "~store";
import { reactNativeListeners } from "~store/reactNativeListeners";
import { AppNavigator } from "~navigation";
import { LoadingIndicator } from "~components/LoadingIndicator";
import { ErrorBoundary } from "~components/ErrorBoundary";
import { ThemeProvider } from "~contexts/theme/ThemeProvider";

const store = setupStore();
// Sets up the native listeners
setupListeners(store.dispatch, reactNativeListeners);

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingIndicator />}>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
