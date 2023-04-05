import {
  ChevronLeft,
  Checked,
  Unchecked,
  Cappuccino,
  Espresso,
  Large,
  Medium,
  Small,
  Milk,
} from "./icons";

export const iconRegistry = {
  ChevronLeft,
  Checked,
  Unchecked,

  // Types
  Cappuccino,
  Espresso,
  Ristretto: Espresso,
  Lungo: Medium,

  // Sizes
  Large,
  Tall: Large,
  Medium,
  Venti: Medium,
  Small,

  // Extras
  Milk,
  Sugar: Cappuccino,
} as const;
