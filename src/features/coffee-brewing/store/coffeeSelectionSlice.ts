import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "~store";

type SelectionType = "types" | "sizes" | "extras";

type CoffeeSelectionState = Record<SelectionType, Record<string, string[]>>;

const initialState: CoffeeSelectionState = {
  types: {},
  sizes: {},
  extras: {},
};

export const coffeeSelectionSlice = createSlice({
  name: "coffeeSelection",
  initialState,
  reducers: {
    setSelection: (
      state,
      action: PayloadAction<{
        type: SelectionType;
        selection: Record<string, string[]>;
      }>,
    ) => {
      const type = action.payload.type;
      const selection = action.payload.selection;
      state[type] = selection;
    },
    clearSelection: (state) => {
      state.types = initialState.types;
      state.sizes = initialState.sizes;
      state.extras = initialState.extras;
    },
  },
});

export const { setSelection, clearSelection } = coffeeSelectionSlice.actions;

/**
 * Selects the current selection from the state
 * @param state The state
 * @returns The current selection
 */
const selectCoffeeSelection = (state: RootState) => state.coffeeSelection;

/**
 * Selects the currently selected values
 */
export const selectCurrentSelection = createSelector(
  selectCoffeeSelection,
  (selection) => ({
    type: Object.keys(selection.types)[0],
    size: Object.keys(selection.sizes)[0],
    extras: selection.extras,
  }),
);

/**
 * Selects the coffee selection by selection type (being types, sizes or extras)
 */
export const selectCoffeeSelectionByType = createSelector(
  selectCoffeeSelection,
  (_state: RootState, type: SelectionType) => type,
  (selection, type) => selection[type],
);

export const { reducer: coffeeSelectionSliceReducer } = coffeeSelectionSlice;
