import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Config } from "~config";
import { RootState } from "~store";

type SelectionType = "types" | "sizes" | "extras";

export type CoffeeSelectionState = Record<
  SelectionType,
  Record<string, string[]>
> & {
  /**
   * The machine id
   * Could be set on NFC
   */
  machineId: string;
};

export type SelectionPayload = {
  type: SelectionType;
  selection: Record<string, string[]>;
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
    chooseMachineId: (state, action: PayloadAction<string>) => {
      state.machineId = action.payload;
    },
    makeSelection: (state, action: PayloadAction<SelectionPayload>) => {
      const type = action.payload.type;
      const selection = action.payload.selection;
      state[type] = selection;
    },
    makeSubselection: (state, action: PayloadAction<SelectionPayload>) => {
      const type = action.payload.type;
      const selection = action.payload.selection;
      Object.keys(selection).map((key) => (state[type][key] = selection[key]));
    },
    clearSelection: (state) => {
      state.types = initialState.types;
      state.sizes = initialState.sizes;
      state.extras = initialState.extras;
    },
  },
});

export const {
  chooseMachineId,
  makeSelection,
  makeSubselection,
  clearSelection,
} = coffeeSelectionSlice.actions;

/**
 * Selects the selected machine id
 * @param state The state
 * @returns The machine id
 */
export const selectMachineId = (state: RootState) =>
  state.coffeeSelection.machineId;

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

export const { reducer: coffeeSelectionSliceReducer } = coffeeSelectionSlice;
