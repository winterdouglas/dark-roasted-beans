import { DarkTheme, ExtendedTheme } from "@react-navigation/native";

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#FFFFFF",
    background: "#000000",
    card: "#000000",
    text: "#FFFFFF",

    onPrimary: "#000000",
    secondary: "#AED7A0",
    onSecondary: "#FFFFFF",
  },
};
