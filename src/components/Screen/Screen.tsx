import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  Platform,
  type StyleProp,
  View,
  type ViewStyle,
  StatusBar,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { spacing } from "@theme";
import {
  type ExtendedEdge,
  useSafeAreaInsetsStyle,
} from "@hooks/useSafeAreaInsetsStyle";
import { HeaderProps, useHeader } from "@hooks/useHeader";
import { Text } from "@components/Text";

type BaseScreenProps = HeaderProps & {
  /**
   * Screen subtitle.
   */
  subtitle?: string;
  /**
   * Children components.
   */
  children?: ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Determines whether the screen content receives automatic horizontal padding
   * Default: True
   */
  contentHorizontalPadding?: boolean;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
};

type FixedScreenProps = BaseScreenProps & {
  preset?: "fixed";
};

export type ScreenProps = FixedScreenProps;

const ScreenWithoutScrolling = ({
  subtitle,
  style,
  contentHorizontalPadding = true,
  contentContainerStyle,
  children,
}: ScreenProps) => {
  const { colors } = useTheme();

  const $subtitleStyle: StyleProp<TextStyle> = [{ color: colors.text }];

  return (
    <View style={[$outerStyle, style]}>
      <View
        style={[
          $fixedContentContainerStyle,
          contentHorizontalPadding && { paddingHorizontal: spacing.medium },
          contentContainerStyle,
        ]}>
        <Text preset="subheading" style={$subtitleStyle} text={subtitle} />
        {children}
      </View>
    </View>
  );
};

export const Screen = ({
  title,
  titleProps,
  leftIcon,
  iconProps,
  onLeftIconPress,
  ...props
}: ScreenProps) => {
  useHeader({ title, leftIcon, onLeftIconPress, iconProps, titleProps });
  const { colors } = useTheme();

  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges = ["bottom"],
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[$containerStyle, { backgroundColor }, $containerInsets]}>
      <StatusBar backgroundColor={backgroundColor || colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}>
        <ScreenWithoutScrolling {...props} />
      </KeyboardAvoidingView>
    </View>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
};

const $fixedContentContainerStyle: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "stretch",
};
