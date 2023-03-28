import React from "react";
import { ListItem, ListItemProps } from "~components/ListItem";
import { CoffeeExtraOption } from "~features/coffee-brewing/store";
import { CoffeeSubselectionList } from "~features/coffee-brewing/components/CoffeeSubselectionList";

export type CoffeeSelectionListItemProps = ListItemProps & {
  subselections?: CoffeeExtraOption[];
  selectedValues?: string[];
  onSelectedValuesChanged?: (values: string[]) => void;
};

export const CoffeeSelectionListItem = ({
  subselections = [],
  selectedValues = [],
  onSelectedValuesChanged,
  ...props
}: CoffeeSelectionListItemProps) => {
  return (
    <ListItem
      round
      shadowed
      FooterComponent={
        <CoffeeSubselectionList
          subselections={subselections}
          selectedValues={selectedValues}
          onSelectedValuesChanged={onSelectedValuesChanged}
        />
      }
      {...props}
    />
  );
};
