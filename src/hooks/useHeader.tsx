import React, { DependencyList, useLayoutEffect } from "react";
import { TextStyle } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Text, TextProps, Icon, IconProps } from "@components";

export type HeaderProps = {
  /**
   * The screen title
   */
  title?: string;
  /**
   * An optional left icon
   * Default: it uses a chevron left
   */
  leftIcon?: IconProps["icon"];
  /**
   * Function that is invoked when the user presses the left icon
   * @returns void
   */
  onLeftIconPress?: () => void;
  /**
   * Title properties to override
   */
  titleProps?: Omit<TextProps, "children" | "text">;
  /**
   * Icon properties to override
   */
  iconProps?: IconProps;
};

/**
 * A hook that can be used to set the header of react-navigation screen from within the screen's component.
 */
export const useHeader = (
  { title, leftIcon, onLeftIconPress, iconProps, titleProps }: HeaderProps,
  deps: DependencyList = [],
) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const color = colors.primary;

  useLayoutEffect(() => {
    if (title || leftIcon || onLeftIconPress || iconProps || titleProps) {
      navigation.setOptions({
        headerShown: true,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Icon
              icon={leftIcon || "ChevronLeft"}
              onPress={onLeftIconPress || navigation.goBack}
              color={color}
              {...iconProps}
            />
          ) : null,
        headerTitle: () => (
          <Text
            style={[$titleStyle, { color }]}
            text={title}
            preset="heading"
            {...titleProps}
          />
        ),
      } as NativeStackNavigationOptions);
    }
  }, [
    color,
    iconProps,
    navigation,
    onLeftIconPress,
    title,
    deps,
    leftIcon,
    titleProps,
  ]);
};

const $titleStyle: TextStyle = {
  flex: 1,
};
