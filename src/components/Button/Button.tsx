import React from "react";
import { ListItem, ListItemProps } from "~components/ListItem";

export type ButtonProps = ListItemProps;

export const Button = (props: ButtonProps) => {
  return <ListItem round textProps={{ preset: "bold" }} {...props} />;
};
