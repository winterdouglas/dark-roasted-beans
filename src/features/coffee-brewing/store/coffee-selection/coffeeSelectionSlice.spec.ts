import { AppStore, setupStore } from "~store/setupStore";
import {
  SelectionPayload,
  chooseMachineId,
  makeSelection,
  makeSubselection,
  clearSelection,
} from "./coffeeSelectionSlice";

describe("coffeeSelectionSlice", () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore();
  });

  it("should have a default machine id", () => {
    // This is backed by react-native-config, which is mocked in tests
    expect(store.getState().coffeeSelection.machineId).toEqual("fake-id");
  });

  describe("chooseMachineId", () => {
    it("should set the selected machine", () => {
      const machineId = "any_other_id";
      store.dispatch(chooseMachineId(machineId));

      expect(store.getState().coffeeSelection.machineId).toBe(machineId);
    });
  });

  describe("makeSelection", () => {
    it("should replace the current selection for the specified selection type", () => {
      const selection1: SelectionPayload = {
        type: "types",
        selection: { id1: ["any_value"] },
      };
      const selection2: SelectionPayload = {
        type: "types",
        selection: { id2: ["any_value2"] },
      };

      store.dispatch(makeSelection(selection1));
      store.dispatch(makeSelection(selection2));

      const { coffeeSelection } = store.getState();
      expect(coffeeSelection.types.id1).toBeUndefined();
      expect(coffeeSelection.types.id2).toHaveLength(1);
      expect(coffeeSelection.types.id2).toStrictEqual(selection2.selection.id2);
      expect(coffeeSelection.sizes).toStrictEqual({});
      expect(coffeeSelection.extras).toStrictEqual({});
    });
  });

  describe("makeSubselection", () => {
    it("should append the current selection for the specified selection type", () => {
      const selection1: SelectionPayload = {
        type: "extras",
        selection: { id1: ["any_value"] },
      };
      const selection2: SelectionPayload = {
        type: "extras",
        selection: { id1: ["any_value", "any_value2"] },
      };

      store.dispatch(makeSubselection(selection1));
      store.dispatch(makeSubselection(selection2));

      const { coffeeSelection } = store.getState();

      expect(coffeeSelection.extras.id1).toHaveLength(2);
      expect(coffeeSelection.types).toStrictEqual({});
      expect(coffeeSelection.sizes).toStrictEqual({});
    });
  });

  describe("clearSelection", () => {
    it("should clear the entire selection", () => {
      store.dispatch(
        makeSelection({
          type: "types",
          selection: { typeId: ["any_type"] },
        }),
      );

      store.dispatch(
        makeSelection({
          type: "sizes",
          selection: { sizeId: ["any_size"] },
        }),
      );

      store.dispatch(
        makeSelection({
          type: "extras",
          selection: { extraId: ["any_extras"] },
        }),
      );

      store.dispatch(clearSelection());

      const { coffeeSelection } = store.getState();
      expect(coffeeSelection.types).toStrictEqual({});
      expect(coffeeSelection.sizes).toStrictEqual({});
      expect(coffeeSelection.extras).toStrictEqual({});
    });
  });
});
