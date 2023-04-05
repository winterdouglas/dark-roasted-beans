import React, { ReactNode } from "react";
import {
  type StyleProp,
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from "react-native";
import { useTheme } from "~hooks/useTheme";
import { typography } from "~theme";

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof $presets;

export type TextProps = RNTextProps & {
  /**
   * The text to be displayed. When set it gains precedence over children
   */
  text?: string;
  /**
   * Style override
   */
  style?: StyleProp<TextStyle>;
  /**
   * The visual preset
   */
  preset?: Presets;
  /**
   * Font weight override
   */
  weight?: Weights;
  /**
   * Font size override
   */
  size?: Sizes;
  /**
   * Children, can be used to nest text (as a span). When text is set it takes precedence
   * over this
   */
  children?: ReactNode;
};

export const Text = ({
  preset = "default",
  weight,
  size,
  text,
  children,
  style: $styleOverride,
  ...rest
}: TextProps) => {
  const { colors } = useTheme();
  const content = text || children;

  const $styles = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    { color: colors.text },
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
};

const $sizeStyles = {
  /**
   * Sub headings
   */
  lg: { fontSize: 24, lineHeight: 33 } as TextStyle,
  /**
   * Bold / Button
   */
  md: { fontSize: 18, lineHeight: 25 } as TextStyle,
  /**
   * Headings / Body
   */
  sm: { fontSize: 16, lineHeight: 22 } as TextStyle,
  /**
   * List
   */
  xs: { fontSize: 14, lineHeight: 19 } as TextStyle,
};

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => ({ ...acc, [weight]: { fontFamily } }),
  {},
) as Record<Weights, TextStyle>;

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { fontWeight: "500", letterSpacing: 0.374 },
];

// Because we don't use font variations we instead set the font weight directly
const $presets = {
  default: $baseStyle,

  heading: [$baseStyle, { fontWeight: 700 }] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg] as StyleProp<TextStyle>,

  list: [
    $baseStyle,
    $sizeStyles.xs,
    { fontWeight: 600 },
  ] as StyleProp<TextStyle>,

  bold: [
    $baseStyle,
    $sizeStyles.md,
    { fontWeight: 700 },
  ] as StyleProp<TextStyle>,
};
