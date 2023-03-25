import React, { useLayoutEffect } from "react";
import { TextStyle } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Text, TextProps, Icon, IconProps } from "@components";

type UseHeaderProps = TextProps & {
  title?: string;
  icon?: IconProps["icon"];
  onLeftIconPress?: () => void;
  iconProps?: IconProps;
};

/**
 * A hook that can be used to set the header of react-navigation screen from within the screen's component.
 */
export function useHeader({
  title,
  icon,
  onLeftIconPress,
  iconProps,
  ...textProps
}: UseHeaderProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const color = colors.primary;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: ({ canGoBack }) =>
        canGoBack ? (
          <Icon
            icon={icon || "ChevronLeft"}
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
          {...textProps}
        />
      ),
    } as NativeStackNavigationOptions);
  }, [color, icon, iconProps, navigation, onLeftIconPress, textProps, title]);
}

const $titleStyle: TextStyle = {
  flex: 1,
};
