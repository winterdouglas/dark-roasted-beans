import React from "react";
import { View } from "react-native";
import { ListItem, ListItemProps } from "~components/ListItem";
import { Text } from "~components/Text";
import { CoffeeExtraOption } from "~features/coffee-brewing/store";

export type SelectionListItemProps = ListItemProps & {
  subselections?: CoffeeExtraOption[];
};

export const SelectionListItem = ({
  subselections = [],
  ...props
}: SelectionListItemProps) => {
  return (
    <ListItem
      round
      shadowed
      FooterComponent={<SubSelectionList subselections={subselections} />}
      {...props}
    />
  );
};

type SubSelectionListProps = {
  subselections: CoffeeExtraOption[];
};

export const SubSelectionList = ({ subselections }: SubSelectionListProps) => {
  return (
    <View>
      {subselections.map((item, index) => (
        // This can't be a FlatList because it's nested, so mapping it instead
        <Text key={index} text={item.name} />
      ))}
    </View>
  );
};
