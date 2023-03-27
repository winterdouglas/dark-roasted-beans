import React from "react";
import { type PressableProps } from "react-native";
import { useScaleAnimationStyle } from "@hooks/useScaleAnimationStyle";
import { AnimatedPressable } from "@components/AnimatedPressable";

export type PressableScaleProps = PressableProps & {
  activeScale?: number;
};

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
