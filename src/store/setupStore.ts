import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  coffeeMachineApiSlice,
  coffeeSelectionSliceReducer,
} from "~features/coffee-brewing/store";

const reducer = combineReducers({
  coffeeSelection: coffeeSelectionSliceReducer,
  [coffeeMachineApiSlice.reducerPath]: coffeeMachineApiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coffeeMachineApiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
