import {
  createEntityAdapter as RTKCreateEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "~config";
import { RootState } from "~store";
import type { CoffeeMachineDto } from "./apiTypes";
import type {
  CoffeeMachine,
  CoffeeType,
  CoffeeSize,
  CoffeeExtra,
} from "./entities";
import { getId, WithCustomId } from "./withCustomId";

const createEntityAdapter = <TEntityType extends WithCustomId>() =>
  RTKCreateEntityAdapter<TEntityType>({ selectId: getId });

const coffeeMachineAdapter = createEntityAdapter<CoffeeMachine>();
const coffeeTypeAdapter = createEntityAdapter<CoffeeType>();
const coffeeSizeAdapter = createEntityAdapter<CoffeeSize>();
const coffeeExtraAdapter = createEntityAdapter<CoffeeExtra>();

type NormalizedCoffeeMachineResponse = {
  machines: EntityState<CoffeeMachine>;
  types: EntityState<CoffeeType>;
  sizes: EntityState<CoffeeSize>;
  extras: EntityState<CoffeeExtra>;
};

export const coffeeMachineApiSlice = createApi({
  reducerPath: "coffeeMachineApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL }),
  endpoints: (builder) => ({
    getCoffeeMachineById: builder.query<
      NormalizedCoffeeMachineResponse,
      string
    >({
      query: (id) => `coffee-machine/${id}`,
      transformResponse: (response: CoffeeMachineDto) => {
        // Normalizing response with EntityAdapter

        const machines = coffeeMachineAdapter.setAll(
          coffeeMachineAdapter.getInitialState(),
          [
            {
              ...response,
              types: response.types.map(getId),
              sizes: response.sizes.map(getId),
              extras: response.extras.map(getId),
            },
          ],
        );

        const types = coffeeTypeAdapter.setAll(
          coffeeTypeAdapter.getInitialState(),
          response.types.map((type) => ({ ...type })),
        );

        const sizes = coffeeSizeAdapter.setAll(
          coffeeSizeAdapter.getInitialState(),
          response.sizes.map((size) => ({ ...size })),
        );

        const extras = coffeeExtraAdapter.setAll(
          coffeeExtraAdapter.getInitialState(),
          response.extras,
        );

        return {
          machines,
          types,
          sizes,
          extras,
        };
      },
    }),
  }),
});

export const { useGetCoffeeMachineByIdQuery } = coffeeMachineApiSlice;

export const createSelectCoffeeMachine = (id: string) =>
  coffeeMachineApiSlice.endpoints.getCoffeeMachineById.select(id);

const selectData = createSelector(
  (state: RootState, id: string) => createSelectCoffeeMachine(id)(state),
  (result) => result.data,
);

export const createCoffeeMachineSelectors = (id: string) =>
  coffeeMachineAdapter.getSelectors(
    (state: RootState) =>
      selectData(state, id)?.machines ?? coffeeMachineAdapter.getInitialState(),
  );

export const createCoffeeTypeSelectors = (id: string) =>
  coffeeTypeAdapter.getSelectors(
    (state: RootState) =>
      selectData(state, id)?.types ?? coffeeTypeAdapter.getInitialState(),
  );

export const createCoffeeSizeSelectors = (id: string) =>
  coffeeSizeAdapter.getSelectors(
    (state: RootState) =>
      selectData(state, id)?.sizes ?? coffeeSizeAdapter.getInitialState(),
  );

export const createCoffeeExtrasSelectors = (id: string) =>
  coffeeExtraAdapter.getSelectors(
    (state: RootState) =>
      selectData(state, id)?.extras ?? coffeeExtraAdapter.getInitialState(),
  );

export const createOverviewSelector = ({
  id,
  type,
  size,
  extras = {},
}: {
  id: string;
  type: string;
  size: string;
  extras: Record<string, string[]>;
}) =>
  createSelector(
    (state: RootState) => selectData(state, id),
    (data): (CoffeeType | CoffeeSize | CoffeeExtra)[] => {
      // We're passing in the straight type from the selection as an argument,
      // therefore not adding a dependency between slices
      const foundType = data?.types.entities[type];
      const foundSize = data?.sizes.entities[size];
      const foundExtras = Object.keys(extras)
        .map((extraId) => {
          const subselections = extras[extraId];
          const extra = data?.extras.entities[extraId];
          return {
            ...extra,
            subselections: extra.subselections.filter((f) =>
              subselections.includes(f._id),
            ),
          };
        })
        .filter((e) => !!e.subselections.length);

      return [foundType, foundSize, ...foundExtras];
    },
  );
