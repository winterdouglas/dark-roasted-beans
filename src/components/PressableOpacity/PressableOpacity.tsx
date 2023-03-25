import React from "react";
import { type PressableProps } from "react-native";
import { AnimatedPressable } from "components/AnimatedPressable";
import { useOpacityAnimationStyle } from "hooks/useOpacityAnimationStyle";

export type PressableOpacityProps = PressableProps & {
  activeOpacity?: number;
};

export function PressableOpacity({
  activeOpacity = 0.8,
  ...props
}: PressableOpacityProps) {
  const [animatedStyle, animate] = useOpacityAnimationStyle(1);

  return (
    <AnimatedPressable
      {...props}
      onPressIn={(event) => {
        animate(activeOpacity);
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
}
