/**
 * Used for paddings and margins
 */
export const spacing = {
  nano: 1,
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
  huge: 32,
  massive: 64,
} as const;

export type Spacing = keyof typeof spacing;
