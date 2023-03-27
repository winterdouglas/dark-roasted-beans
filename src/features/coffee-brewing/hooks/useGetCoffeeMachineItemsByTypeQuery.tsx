import { useAppSelector } from "~hooks/useAppSelector";
import {
  selectCurrentSelection,
  useGetCoffeeMachineByIdQuery,
} from "~features/coffee-brewing/store";

export const useGetCoffeeMachineItemsByTypeQuery = (
  machineId: string,
  selectionType: "types" | "sizes" | "extras",
) => {
  // This is the selected type in the store,
  // Used to filter related options
  const { type } = useAppSelector(selectCurrentSelection);

  return useGetCoffeeMachineByIdQuery(machineId, {
    selectFromResult: ({ data }) => {
      if (!data) return { items: [] };

      if (selectionType === "types") {
        return { items: Object.values(data[selectionType].entities) };
      }

      const itemsOfType = data.types.entities[type][selectionType].map(
        (sizeOrExtra) => ({ ...data[selectionType].entities[sizeOrExtra] }),
      );

      return {
        items: itemsOfType || [],
      };
    },
  });
};