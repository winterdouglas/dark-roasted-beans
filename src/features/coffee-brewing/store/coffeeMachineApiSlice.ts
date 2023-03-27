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
import { WithCustomId } from "./withCustomId";

const createEntityAdapter = <TEntityType extends WithCustomId>() =>
  RTKCreateEntityAdapter<TEntityType>({ selectId: (c) => c._id });

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

const getId = ({ _id }: WithCustomId) => _id;

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
        // Normalizing with EntityAdapter

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
