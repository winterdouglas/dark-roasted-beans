import {
  DarkTheme,
  DefaultTheme,
  ExtendedTheme,
} from "@react-navigation/native";

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
    tertiary: "#9BC88B",
    onTertiary: "#FFFFFF",
  },
};

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
    tertiary: "#9BC88B",
    onTertiary: "#000000",
  },
};
