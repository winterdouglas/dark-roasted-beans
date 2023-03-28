import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Config } from "~config";
import { List } from "~components/List";
import { Screen } from "~components/Screen";
import {
  clearSelection,
  createCoffeeExtrasSelectors,
  createCoffeeSizeSelectors,
  createCoffeeTypeSelectors,
  selectCurrentCoffeeSelection,
} from "~features/coffee-brewing/store";
import { useAppSelector } from "~hooks/useAppSelector";
import { AppStackScreenProps } from "~navigation";
import { Button } from "~components/Button";
import { useAppDispatch } from "~hooks/useAppDispatch";
import { CoffeeSelectionListItem } from "~features/coffee-brewing/components/CoffeeSelectionListItem";

const MachineId = Config.MACHINE_ID;

type OverviewScreenProps = AppStackScreenProps<"Overview"> & {};

export const OverviewScreen = ({ navigation }: OverviewScreenProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("overview");

  const { selectById: selectCoffeeTypeById } = useMemo(
    () => createCoffeeTypeSelectors(MachineId),
    [],
  );
  const { selectById: selectCoffeeSizeById } = useMemo(
    () => createCoffeeSizeSelectors(MachineId),
    [],
  );
  const { selectById: selectCoffeeExtrasById } = useMemo(
    () => createCoffeeExtrasSelectors(MachineId),
    [],
  );
  const { type, size, extras } = useAppSelector(selectCurrentCoffeeSelection);

  const selectedType = useAppSelector((state) =>
    selectCoffeeTypeById(state, type),
  );

  const selectedSize = useAppSelector((state) =>
    selectCoffeeSizeById(state, size),
  );

  const items = [selectedType, selectedSize];

  return (
    <Screen title={t("title")} subtitle={t("subtitle")}>
      <List
        data={items}
        preset="continuous"
        renderItem={({ item }) => {
          return (
            <CoffeeSelectionListItem
              // eslint-disable-next-line dot-notation
              subselections={item["subselections"]}
              text={item.name}
              disabled
            />
          );
        }}
      />
      <Button
        text={t("brew")}
        onPress={() => {
          dispatch(clearSelection());
          navigation.navigate("Result");
        }}
      />
    </Screen>
  );
};
