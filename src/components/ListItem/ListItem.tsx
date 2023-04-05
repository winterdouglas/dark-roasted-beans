import React, { ComponentType, ReactElement } from "react";
import {
  ColorValue,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { spacing } from "~theme";
import { Icon, Icons } from "~components/Icon";
import { Text, TextProps } from "~components/Text";
import { PressableScale } from "~components/PressableScale";
import { useTheme } from "~hooks/useTheme";

export type ListItemProps = PressableProps & {
  /**
   * How tall the list item should be.
   * Default: 94
   */
  height?: number;
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean;
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean;
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"];
  /**
   * Whether the list item is round or not
   */
  round?: boolean;
  /**
   * Whether the list item is shadowed or not
   */
  shadowed?: boolean;
  /**
   * Children components.
   */
  children?: TextProps["children"];
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Pass any additional props directly to the Text component.
   */
  textProps?: TextProps;
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional PressableOpacity style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: Icons;
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string;
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: Icons;
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string;
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement;
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement;
  /**
   * An optional footer ReactElement.
   */
  FooterComponent?: ReactElement;
  /**
   * Custom pressable
   */
  PressableComponent?: ComponentType<PressableProps>;
};

type ListItemActionProps = {
  icon?: Icons;
  iconColor?: ColorValue;
  Component?: ReactElement;
  size: number;
};

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 */
export const ListItem = ({
  children,
  height = 94,
  LeftComponent,
  leftIcon,
  leftIconColor,
  RightComponent,
  FooterComponent,
  rightIcon,
  rightIconColor,
  style,
  text,
  textProps,
  round,
  shadowed = true,
  textStyle: $textStyleOverride,
  containerStyle: $containerStyleOverride,
  PressableComponent,
  ...pressableProps
}: ListItemProps) => {
  const { colors } = useTheme();
  const { secondary, onSecondary, shadow } = colors;

  const $textStyles = [
    $textStyle,
    $textStyleOverride,
    { color: onSecondary },
    textProps?.style,
  ];

  const $pressableShadowStyles: ViewStyle = {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowColor: shadow,
    shadowRadius: 4,
    overflow: "visible",
    elevation: 4,
  };

  const $pressableStyles: StyleProp<ViewStyle> = [
    round && $roundStyle,
    shadowed && $pressableShadowStyles,
    {
      backgroundColor: secondary,
    },
    style,
  ];

  const $contentContainerStyles: StyleProp<ViewStyle> = [
    $contentContainerStyle,
    { minHeight: height },
  ];

  const Pressable = PressableComponent || PressableScale;

  return (
    <View style={$containerStyleOverride}>
      <Pressable {...pressableProps} style={$pressableStyles}>
        <View style={$contentContainerStyles}>
          <ListItemAction
            size={height}
            icon={leftIcon}
            iconColor={leftIconColor || onSecondary}
            Component={LeftComponent}
          />

          <Text preset="list" text={text} style={$textStyles} {...textProps}>
            {children}
          </Text>

          <ListItemAction
            size={height}
            icon={rightIcon}
            iconColor={rightIconColor || onSecondary}
            Component={RightComponent}
          />
        </View>
        {FooterComponent}
      </Pressable>
    </View>
  );
};

const ListItemAction = (props: ListItemActionProps) => {
  const { icon, Component, iconColor, size } = props;

  const $iconContainerStyles = [$iconContainer];

  if (Component) return Component;

  if (icon) {
    return (
      <Icon
        // TODO: Make sure the icon size is consistent!
        // size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[$iconContainerStyles, { height: size }]}
      />
    );
  }

  return null;
};

const $roundStyle: ViewStyle = {
  borderRadius: 4,
  overflow: "hidden",
};

const $textStyle: TextStyle = {
  paddingVertical: spacing.extraSmall,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
};

const $contentContainerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.large,
  paddingHorizontal: spacing.extraLarge,
};

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
};
