import { ChevronLeft } from "./icons";

export const iconRegistry = {
  ChevronLeft,
} as const;

export type Icons = keyof typeof iconRegistry;
