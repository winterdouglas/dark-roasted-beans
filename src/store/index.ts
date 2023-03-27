import { configureStore } from "@reduxjs/toolkit";
import {
  coffeeMachineApiSlice,
  coffeeSelectionSliceReducer,
} from "~features/coffee-brewing/store";

export const store = configureStore({
  reducer: {
    coffeeSelection: coffeeSelectionSliceReducer,
    [coffeeMachineApiSlice.reducerPath]: coffeeMachineApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coffeeMachineApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
