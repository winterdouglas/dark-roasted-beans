import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  Platform,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native";

import { spacing } from "@theme";
import {
  type ExtendedEdge,
  useSafeAreaInsetsStyle,
} from "@hooks/useSafeAreaInsetsStyle";
import { HeaderProps, useHeader } from "@hooks/useHeader";
import { Text } from "@components";

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
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: "light" | "dark";
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  // StatusBarProps?: StatusBarProps;
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
  return (
    <View style={[$outerStyle, style]}>
      <View
        style={[
          $fixedContentContainerStyle,
          contentHorizontalPadding && { paddingHorizontal: spacing.medium },
          contentContainerStyle,
        ]}>
        <Text preset="subheading" text={subtitle} />
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

  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges = ["bottom"],
    // statusBarStyle = "dark",
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[$containerStyle, { backgroundColor }, $containerInsets]}>
      {/* <StatusBar style={statusBarStyle} {...StatusBarProps} /> */}

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
