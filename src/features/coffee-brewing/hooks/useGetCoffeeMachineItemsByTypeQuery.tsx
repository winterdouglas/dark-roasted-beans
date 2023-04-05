import { useAppSelector } from "~hooks/useAppSelector";
import {
  selectCurrentCoffeeSelection,
  useGetCoffeeMachineByIdQuery,
} from "~features/coffee-brewing/store";

export const useGetCoffeeMachineItemsByTypeQuery = (
  machineId: string,
  selectionType: "types" | "sizes" | "extras",
  refetchOnReconnect = true,
) => {
  // This is the selected type in the store,
  // Used to filter related options
  const { type } = useAppSelector(selectCurrentCoffeeSelection);

  return useGetCoffeeMachineByIdQuery(machineId, {
    refetchOnReconnect: refetchOnReconnect,
    selectFromResult: ({ data }) => {
      if (!data) return { items: [] };

      if (selectionType === "types") {
        return { items: Object.values(data[selectionType].entities) };
      }

      const itemsOfType = data.types.entities[type]?.[selectionType].map(
        (sizeOrExtra) => ({ ...data[selectionType].entities[sizeOrExtra] }),
      );

      return {
        items: itemsOfType || [],
      };
    },
  });
};
