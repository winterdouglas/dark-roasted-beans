import ChevronLeft from "./chevron-left.svg";

export const iconRegistry = {
  ChevronLeft,
} as const;

export type Icons = keyof typeof iconRegistry;
