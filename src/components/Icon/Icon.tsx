import React from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import {
  PressableOpacity,
  PressableOpacityProps,
} from "~components/PressableOpacity";
import { iconRegistry } from "./iconsRegistry";

export type IconProps = {
  /**
   * The icon to display
   */
  icon: Icons;

  /**
   * An optional color for the icon
   */
  color?: ColorValue;

  /**
   * An optional size for the icon.
   * Default: 24
   */
  size?: number;

  /**
   * Style overrides for the icon
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: PressableOpacityProps["onPress"];
};

export const Icon = (props: IconProps) => {
  const {
    icon,
    color,
    // size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const WrapperComponent = isPressable ? PressableOpacity : View;

  if (!(icon in iconRegistry)) return null;

  const IconComponent = iconRegistry[icon];

  return (
    <WrapperComponent
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      style={$containerStyleOverride}
      {...WrapperProps}>
      <IconComponent
        style={$imageStyleOverride}
        color={color}
        // TODO: Make sure the icon size is consistent! For now relying on the source
        // width={size}
        // height={size}
      />
    </WrapperComponent>
  );
};

export type Icons = keyof typeof iconRegistry;
