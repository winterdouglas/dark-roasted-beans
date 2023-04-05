// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as ReactNative from "react-native";

// libraries to mock
jest.mock("react-native-config", () => ({
  API_URL: "",
  MACHINE_ID: "fake-id",
}));

jest.useFakeTimers();

// call animation
// jest.runAllTimers();
