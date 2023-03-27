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
export const selectCoffeeSelection = (state: RootState) =>
  state.coffeeSelection;

/**
 * Selects the selected type id
 */
export const selectSelectedType = createSelector(
  selectCoffeeSelection,
  (selection) => Object.keys(selection.types)[0],
);

/**
 * Selects the coffee selection by selection type (being types, sizes or extras)
 */
export const selectCoffeeSelectionByType = createSelector(
  selectCoffeeSelection,
  (_state: RootState, type: SelectionType) => type,
  (selection, type) => selection[type],
);

// const hasKeys = (object: Object) => !!Object.keys(object).length;

// export const selectNextSelection = createSelector(
//   selectCoffeeSelection,
//   (selection): SelectionType => {
//     if (hasKeys(selection.types)) return "sizes";
//     if (hasKeys(selection.))
//   },
// );

export const { reducer: coffeeSelectionSliceReducer } = coffeeSelectionSlice;
