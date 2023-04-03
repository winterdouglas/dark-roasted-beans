import React from "react";
import { ListItem, ListItemProps } from "~components/ListItem";
import { CoffeeExtraOption } from "~features/coffee-brewing/store/coffee-machine";
import { CoffeeSubselectionList } from "~features/coffee-brewing/components/CoffeeSubselectionList";

export type CoffeeSelectionListItemProps = ListItemProps & {
  subselectionDisabled?: boolean;
  subselections?: CoffeeExtraOption[];
  selectedValues?: string[];
  onSelectedValuesChanged?: (values: string[]) => void;
};

export const CoffeeSelectionListItem = ({
  subselections = [],
  selectedValues = [],
  onSelectedValuesChanged,
  subselectionDisabled,
  ...props
}: CoffeeSelectionListItemProps) => {
  return (
    <ListItem
      round
      shadowed
      FooterComponent={
        <CoffeeSubselectionList
          disabled={subselectionDisabled}
          subselections={subselections}
          selectedValues={selectedValues}
          onSelectedValuesChanged={onSelectedValuesChanged}
        />
      }
      {...props}
    />
  );
};
