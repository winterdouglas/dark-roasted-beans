import { Platform } from "react-native";

const fonts = {
  avenirNext: {
    // iOS only font.
    normal: "Avenir Next",
  },
  sansSerif: {
    // Android only font.
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
    default: fonts.sansSerif,
  }),
};
