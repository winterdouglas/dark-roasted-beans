import { DarkTheme, ExtendedTheme } from "@react-navigation/native";

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#FFFFFF",
    background: "#1C1C1C",
    card: "#1C1C1C",
    text: "#FFFFFF",

    onPrimary: "#000000",
    secondary: "#AED7A0",
    onSecondary: "#000000",
    shadow: "#FFFFFF",
  },
};
