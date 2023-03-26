import { DefaultTheme, ExtendedTheme } from "@react-navigation/native";

export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",

    onPrimary: "#FFFFFF",
    secondary: "#AED7A0",
    onSecondary: "#FFFFFF",
    shadow: "#000000",
  },
};
