import React from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

import { useScaleAnimationStyle } from "hooks/useScaleAnimationStyle";

export type PressableScaleProps = PressableProps & {
  activeScale?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PressableScale = ({
  activeScale = 0.98,
  ...props
}: PressableScaleProps) => {
  const [animatedStyle, animate] = useScaleAnimationStyle(1);

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(event) => {
        animate(activeScale);
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animate(1);
        props.onPressOut?.(event);
      }}
      style={[props.style, animatedStyle]}>
      {props.children}
    </AnimatedPressable>
  );
};
