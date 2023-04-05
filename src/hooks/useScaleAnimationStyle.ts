import { useEffect } from "react";
import { ViewStyle } from "react-native";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useScaleAnimationStyle = (
  initialValue: number,
): [ViewStyle, (to: number) => void] => {
  const scale = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle((): ViewStyle => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  function animate(to: number) {
    scale.value = withSpring(to, {
      mass: 0.1,
      stiffness: 90,
    });
  }

  useEffect(() => {
    return () => cancelAnimation(scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [animatedStyle, animate];
};
