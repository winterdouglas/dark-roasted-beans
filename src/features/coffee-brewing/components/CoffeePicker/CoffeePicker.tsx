import React, { useMemo } from "react";
import { Config } from "~config";
import { useAppSelector } from "~hooks/useAppSelector";
import { List } from "~components/List";
import {
  createCoffeeTypeSelectors,
  useGetCoffeeMachineByIdQuery,
} from "~features/coffee-brewing/store";

export const CoffeePicker = () => {
  useGetCoffeeMachineByIdQuery(Config.MACHINE_ID);

  const { selectAll } = useMemo(
    () => createCoffeeTypeSelectors(Config.MACHINE_ID),
    [],
  );
  const machines = useAppSelector(selectAll);

  return (
    <List data={machines} getItemProps={(item) => ({ text: item.name })} />
  );
};
