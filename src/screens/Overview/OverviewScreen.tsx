import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Config } from "~config";
import { List } from "~components/List";
import { Screen } from "~components/Screen";
import {
  createCoffeeExtrasSelectors,
  createCoffeeSizeSelectors,
  createCoffeeTypeSelectors,
  selectCurrentSelection,
} from "~features/coffee-brewing/store";
import { useAppSelector } from "~hooks/useAppSelector";
import { ListItem } from "~components/ListItem";
import { AppStackScreenProps } from "~navigation";

const MachineId = Config.MACHINE_ID;

type OverviewScreenProps = AppStackScreenProps<"Overview"> & {};

export const OverviewScreen = ({ navigation }: OverviewScreenProps) => {
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
  const { type, size, extras } = useAppSelector(selectCurrentSelection);

  const selectedType = useAppSelector((state) =>
    selectCoffeeTypeById(state, type),
  );

  const selectedSize = useAppSelector((state) =>
    selectCoffeeSizeById(state, size),
  );

  const items = [selectedType, selectedSize];

  const { t } = useTranslation("overview");

  return (
    <Screen title={t("title")} subtitle={t("subtitle")}>
      <List
        data={items}
        preset="continuous"
        getItemProps={(item) => ({
          text: item.name,
          onPress: () => {},
        })}
      />
      <ListItem
        round
        text={t("brew")}
        onPress={() => {
          navigation.navigate("Result");
        }}
      />
    </Screen>
  );
};
