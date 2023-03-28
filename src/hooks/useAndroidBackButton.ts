import { useCallback } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export type UseAndroidBackButtonProps = {
  onPress: () => void;
};

export const useAndroidBackButton = (onPress: () => void) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (onPress) {
          onPress();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [onPress]),
  );
};
