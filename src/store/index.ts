import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { coffeeMachineApiSlice } from "features/coffee-brewing/store/coffeeMachineApiSlice";
import { coffeeSelectionSliceReducer } from "features/coffee-brewing/store/coffeeSelectionSlice";

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

// setupListeners(store.dispatch);
