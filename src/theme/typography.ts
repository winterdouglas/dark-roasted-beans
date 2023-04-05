import { Platform } from "react-native";

const fonts = {
  /**
   * iOS only font.
   */
  avenirNext: {
    normal: "Avenir Next",
  },
  /**
   * Android only font.
   */
  sansSerif: {
    normal: "sans-serif",
  },
};

export const typography = {
  /**
   * The primary font. Used in most places.
   */
  primary: Platform.select({
    ios: fonts.avenirNext,
    // TODO: Check what to do with Android
    android: fonts.sansSerif,
  }),
};
