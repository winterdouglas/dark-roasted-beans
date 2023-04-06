import { type ErrorInfo } from "react";
import {
  ScrollView,
  type TextStyle,
  View,
  type ViewStyle,
  StyleProp,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "~components/Text";
import { Button } from "~components/Button";
import { spacing } from "~theme";
import { useTheme } from "~hooks/useTheme";
import { useSafeAreaInsetsStyle } from "~hooks/useSafeAreaInsetsStyle";

export interface ErrorScreenProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export const ErrorScreen = ({
  error,
  errorInfo,
  onReset,
}: ErrorScreenProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation("error");
  const $safeAreaStyle = useSafeAreaInsetsStyle(["top", "bottom"]);

  const $containerStyles: StyleProp<ViewStyle> = [
    $safeAreaStyle,
    $containerStyle,
  ];

  const $wrapperStyles: StyleProp<ViewStyle> = [
    $wrapperStyle,
    { backgroundColor: colors.background },
  ];

  const $innerTextStyles: StyleProp<TextStyle> = {
    color: colors.onTertiary,
  };

  const $scrollStyles: StyleProp<ViewStyle> = [
    $errorSection,
    { backgroundColor: colors.tertiary },
  ];

  return (
    <View style={$containerStyles}>
      <View style={$wrapperStyles}>
        <Text style={$heading} text={t("title")} preset="subheading" />
        <Text text={t("subtitle")} />

        <ScrollView
          style={$scrollStyles}
          contentContainerStyle={$errorSectionContentContainer}>
          <Text selectable text={`${error}`.trim()} style={$innerTextStyles} />
          <Text
            selectable
            text={`${errorInfo?.componentStack}`.trim()}
            style={[$errorTrace, $innerTextStyles]}
          />
        </ScrollView>

        <Button style={$resetButton} text={t("reset")} onPress={onReset} />
      </View>
    </View>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
};

const $wrapperStyle: ViewStyle = {
  flex: 1,
  padding: spacing.medium,
};

const $heading: TextStyle = {
  marginBottom: spacing.medium,
};

const $errorSection: ViewStyle = {
  flex: 1,
  marginVertical: spacing.medium,
  borderRadius: spacing.extraSmall,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
};

const $errorTrace: TextStyle = {
  marginTop: spacing.medium,
};

const $resetButton: ViewStyle = {
  paddingHorizontal: spacing.extraLarge,
};
