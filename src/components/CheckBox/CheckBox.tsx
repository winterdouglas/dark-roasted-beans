import { useTheme } from "@react-navigation/native";
import React, { ComponentType, useMemo } from "react";
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  SwitchProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Icon } from "~components/Icon";
import {
  PressableOpacity,
  PressableOpacityProps,
} from "~components/PressableOpacity";
import { Text, TextProps } from "~components/Text";
import { spacing } from "~theme/spacing";

export type CheckBoxProps = Omit<PressableOpacityProps, "style"> & {
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"];
  /**
   * Whether the checkbox is disabled or not.
   */
  disabled?: boolean;
  /**
   * The color for the text and icon
   */
  color?: ColorValue;
  /**
   * The label text to display
   */
  label?: TextProps["text"];
  /**
   * The position of the label relative to the action component.
   * Default: left
   */
  labelPosition?: "left" | "right";
  /**
   * Style overrides for label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional style prop that affects the Icon component.
   */
  iconStyle?: StyleProp<ViewStyle>;
};

export const CheckBox = (props: CheckBoxProps) => {
  const {
    value,
    onPress,
    color,
    disabled,
    onValueChange,
    label,
    labelPosition = "left",
    labelStyle: $labelStyleOverride,
    containerStyle: $containerStyleOverride,
    iconStyle: $iconStyleOverride,
    ...WrapperProps
  } = props;
  const { colors } = useTheme();

  const $containerStyles: StyleProp<ViewStyle> = [
    $containerStyle,
    $containerStyleOverride,
    { backgroundColor: colors.tertiary },
  ];
  const $foreground = colors.onTertiary || color;

  const $labelStyles = [
    $label,
    $labelStyleOverride,
    {
      color: $foreground,
    },
  ];

  const Wrapper = useMemo<ComponentType<PressableOpacityProps>>(
    () => (disabled ? View : PressableOpacity),
    [disabled],
  );

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    onValueChange?.(!value);
    onPress?.(e);
  };

  return (
    <Wrapper
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyles}
      onPress={handlePress}>
      <View style={$inputWrapper}>
        {labelPosition === "left" && (
          <Text preset="list" text={label} style={$labelStyles} />
        )}

        <Icon
          icon={value ? "Checked" : "Unchecked"}
          size={spacing.extraLarge}
          color={$foreground}
          style={$iconStyleOverride}
        />

        {labelPosition === "right" && (
          <Text preset="list" text={label} style={$labelStyles} />
        )}
      </View>
    </Wrapper>
  );
};

const $inputWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.extraLarge,
};

const $label: TextStyle = {
  flex: 1,
};

const $containerStyle: ViewStyle = {
  borderRadius: spacing.extraSmall,
  padding: spacing.medium,
};
