import "@react-navigation/native";
import { ColorValue } from "react-native";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      /**
       * The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
       */
      primary: ColorValue;
      /**
       * The color of various backgrounds, such as background color for the screens.
       */
      background: ColorValue;
      /**
       * The background color of card-like elements, such as headers, tab bars etc.
       */
      card: ColorValue;
      /**
       * The text color of various elements.
       */
      text: ColorValue;
      /**
       * The color of borders, e.g. header border, tab bar border etc.
       */
      border: ColorValue;
      /**
       * The color of Tab Navigator badge.
       */
      notification: ColorValue;

      onPrimary: ColorValue;
      secondary: ColorValue;
      onSecondary: ColorValue;
      shadow: ColorValue;
    };
  };

  export function useTheme(): ExtendedTheme;
}
