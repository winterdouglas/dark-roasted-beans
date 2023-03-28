import React from "react";
import { View } from "react-native";
import { CheckBox } from "~components/CheckBox";
import { CoffeeExtraOption } from "~features/coffee-brewing/store";

type CoffeeSubselectionListProps = {
  subselections: CoffeeExtraOption[];
  selectedValues?: string[];
  onSelectedValuesChanged?: (values: string[]) => void;
};

export const CoffeeSubselectionList = ({
  subselections,
  selectedValues = [],
  onSelectedValuesChanged,
}: CoffeeSubselectionListProps) => {
  return (
    <View>
      {subselections.map((item, index) => (
        // This can't be a FlatList because it's nested, so mapping it instead
        <CheckBox
          key={index}
          value={selectedValues.includes(item._id)}
          label={item.name}
          onValueChange={(value) => {
            const id = item._id;
            const newSelection =
              value && !selectedValues.includes(id)
                ? [...selectedValues, id]
                : remove(selectedValues, id);
            onSelectedValuesChanged?.(newSelection);
          }}
        />
      ))}
    </View>
  );
};

const remove = <T extends number | string>(array: T[], item: T) => {
  const index = array.indexOf(item);
  return index !== -1
    ? [...array.slice(0, index), ...array.slice(index + 1)]
    : array;
};
