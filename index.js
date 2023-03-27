import { AppRegistry } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { name as appName } from "./app.json";
import "./src/lib/i18n";
import App from "./src/App";
import { store } from "./src/store";

const AppBootstrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppBootstrapper);
