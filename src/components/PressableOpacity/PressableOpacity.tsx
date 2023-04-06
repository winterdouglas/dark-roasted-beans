import { type PressableProps } from "react-native";
import { useOpacityAnimationStyle } from "~hooks/useOpacityAnimationStyle";
import { AnimatedPressable } from "~components/AnimatedPressable";

export type PressableOpacityProps = PressableProps & {
  activeOpacity?: number;
};

export const PressableOpacity = ({
  activeOpacity = 0.2,
  ...props
}: PressableOpacityProps) => {
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
};
