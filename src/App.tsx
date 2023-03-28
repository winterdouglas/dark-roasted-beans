import React, { Suspense } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "~store";
import { AppNavigator } from "~navigation";
import { LoadingIndicator } from "~components/LoadingIndicator";
import { ErrorBoundary } from "~components/ErrorBoundary";
import { ThemeProvider } from "~contexts/theme/ThemeProvider";

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
