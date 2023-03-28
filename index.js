import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import "./src/lib/i18n";
import App from "./src/App";

AppRegistry.registerComponent(appName, () => App);
