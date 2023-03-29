import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Config } from "~config";
import { RootState } from "~store";

type SelectionType = "types" | "sizes" | "extras";

type CoffeeSelectionState = Record<SelectionType, Record<string, string[]>> & {
  /**
   * The machine id
   * Could be set on NFC
   */
  machineId: string;
};

const initialState: CoffeeSelectionState = {
  machineId: Config.MACHINE_ID,
  types: {},
  sizes: {},
  extras: {},
};

export const coffeeSelectionSlice = createSlice({
  name: "coffeeSelection",
  initialState,
  reducers: {
    /**
     * Sets the root selection, resetting the inner selection
     */
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
    /**
     * Sets the subselection without resetting the previous selection
     */
    setSubselection: (
      state,
      action: PayloadAction<{
        type: SelectionType;
        selection: Record<string, string[]>;
      }>,
    ) => {
      const type = action.payload.type;
      const selection = action.payload.selection;
      Object.keys(selection).map((key) => (state[type][key] = selection[key]));
    },
    /**
     * Clears the entire selection
     */
    clearSelection: (state) => {
      state.types = initialState.types;
      state.sizes = initialState.sizes;
      state.extras = initialState.extras;
    },
  },
});

export const { setSelection, setSubselection, clearSelection } =
  coffeeSelectionSlice.actions;

/**
 * Selects the current selection from the state
 * @param state The state
 * @returns The current selection
 */
const selectCoffeeSelection = (state: RootState) => state.coffeeSelection;

/**
 * Selects the currently selected values
 */
export const selectCurrentCoffeeSelection = createSelector(
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
export const selectCurrentCoffeeSelectionByType = createSelector(
  selectCoffeeSelection,
  (_state: RootState, type: SelectionType) => type,
  (selection, type) => selection[type],
);

export const selectMachineId = (state: RootState) =>
  state.coffeeSelection.machineId;

export const { reducer: coffeeSelectionSliceReducer } = coffeeSelectionSlice;
