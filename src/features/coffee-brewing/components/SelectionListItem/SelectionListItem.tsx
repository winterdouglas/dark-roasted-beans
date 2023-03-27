import React from "react";
import { ListItem, ListItemProps } from "~components/ListItem";

export type SelectionListItemProps = ListItemProps & {
  subcollection: [];
};

export const SelectionListItem = ({
  text,
  subcollection,
  disabled,
  onPress,
}: SelectionListItemProps) => {
  return <ListItem />;
};
