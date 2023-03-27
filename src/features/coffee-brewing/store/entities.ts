import { WithCustomId } from "./withCustomId";

export type CoffeeType = WithCustomId & {
  name: string;
  sizes: string[];
  extras: string[];
};

export type CoffeeSize = WithCustomId & {
  name: string;
};

export type CoffeeExtra = WithCustomId & {
  name: string;
  /**
   * For the sake of simplicity, this is not being normalized
   */
  subselections: CoffeeExtraOption[];
};

export type CoffeeExtraOption = WithCustomId & {
  name: string;
};

export type CoffeeMachine = WithCustomId & {
  types: string[];
  sizes: string[];
  extras: string[];
};
