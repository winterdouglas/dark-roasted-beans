import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "~hooks/useTheme";
import { spacing } from "~theme";

type Presets = keyof typeof $presets;

export type SeparatorProps = ViewProps & {
  preset?: Presets;
};

/**
 * A separator component
 * @default preset space
 * @param props The component props
 * @returns A separator view
 */
export const Separator = ({
  preset = "space",
  style: $styleOverride,
  ...props
}: SeparatorProps) => {
  const { colors } = useTheme();
  const $separatorStyles = [
    $presets[preset],
    { backgroundColor: preset === "line" && colors.border },
    $styleOverride,
  ];
  return <View style={$separatorStyles} {...props} />;
};

const $presets = {
  space: { height: spacing.extraSmall } as StyleProp<ViewStyle>,

  line: {
    height: spacing.nano,
    marginHorizontal: spacing.extraLarge,
  } as StyleProp<ViewStyle>,
};
