import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~store";

type CoffeeSelectionState = {
  /**
   * The selected type
   */
  type?: string;
  /**
   * The selected size
   */
  size?: string;
  /**
   * This is a dictionary of the extra and the chosen options
   */
  extras: Record<string, string[]>;
};

const initialState: CoffeeSelectionState = {
  type: "",
  size: "",
  extras: {},
};

export const coffeeSelectionSlice = createSlice({
  name: "coffeeSelection",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setExtras: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.extras = action.payload;
    },
    clear: (state) => {
      state.type = initialState.type;
      state.size = initialState.size;
      state.extras = initialState.extras;
    },
  },
});

export const { setType, setSize, setExtras, clear } =
  coffeeSelectionSlice.actions;

export const selectCoffeeSelection = (state: RootState) =>
  state.coffeeSelection;

export const { reducer: coffeeSelectionSliceReducer } = coffeeSelectionSlice;
