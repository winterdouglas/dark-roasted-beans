import { WithCustomId } from "./withCustomId";

export type CoffeeTypeDto = WithCustomId & {
  name: string;
  sizes: string[];
  extras: string[];
};

export type CoffeeSizeDto = WithCustomId & {
  name: string;
};

export type CoffeeExtraOptionDto = WithCustomId & {
  name: string;
};

export type CoffeeExtraDto = WithCustomId & {
  name: string;
  subselections: CoffeeExtraOptionDto[];
};

export type CoffeeMachineDto = WithCustomId & {
  types: CoffeeTypeDto[];
  sizes: CoffeeSizeDto[];
  extras: CoffeeExtraDto[];
};
