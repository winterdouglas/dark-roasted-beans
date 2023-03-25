import { useEffect } from "react";
import { ViewStyle } from "react-native";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { timing } from "theme";

export const useOpacityAnimationStyle = (
  initialValue: number,
): [ViewStyle, (to: number) => void] => {
  const opacity = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle((): ViewStyle => {
    return {
      opacity: opacity.value,
    };
  });

  function animate(to: number) {
    opacity.value = withTiming(to, {
      duration: timing.quick,
    });
  }

  useEffect(() => {
    return () => cancelAnimation(opacity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [animatedStyle, animate];
};
