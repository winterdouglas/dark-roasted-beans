import "@react-navigation/native";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      /**
       * The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
       */
      primary: string;
      /**
       * The color of various backgrounds, such as background color for the screens.
       */
      background: string;
      /**
       * The background color of card-like elements, such as headers, tab bars etc.
       */
      card: string;
      /**
       * The text color of various elements.
       */
      text: string;
      /**
       * The color of borders, e.g. header border, tab bar border etc.
       */
      border: string;
      /**
       * The color of Tab Navigator badge.
       */
      notification: string;
      /**
       * A color that contrasts with primary
       */
      onPrimary: string;
      /**
       * Secondary color
       */
      secondary: string;
      /**
       * A color that contrasts with the secondary
       */
      onSecondary: string;
      /**
       * Default color for shadows
       */
      shadow: string;
      /**
       * A tertiary color variation
       */
      tertiary: string;
      /**
       * A color that contrast with the tertiary
       */
      onTertiary: string;
    };
  };

  export function useTheme(): ExtendedTheme;
}
