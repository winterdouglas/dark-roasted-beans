import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Config } from "~config";
import { List } from "~components/List";
import { Screen } from "~components/Screen";
import {
  clearSelection,
  createOverviewSelector,
  selectCurrentCoffeeSelection,
} from "~features/coffee-brewing/store";
import { useAppSelector } from "~hooks/useAppSelector";
import { AppStackScreenProps } from "~navigation";
import { Button } from "~components/Button";
import { useAppDispatch } from "~hooks/useAppDispatch";
import { CoffeeSelectionListItem } from "~features/coffee-brewing/components/CoffeeSelectionListItem";
import { getId } from "~features/coffee-brewing/store/withCustomId";

const MachineId = Config.MACHINE_ID;

type OverviewScreenProps = AppStackScreenProps<"Overview"> & {};

export const OverviewScreen = ({ navigation }: OverviewScreenProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("overview");

  const currentSelection = useAppSelector(selectCurrentCoffeeSelection);
  const overviewSelector = useMemo(
    () =>
      createOverviewSelector({
        id: MachineId,
        ...currentSelection,
      }),
    [currentSelection],
  );
  const items = useAppSelector(overviewSelector);

  return (
    <Screen title={t("title")} subtitle={t("subtitle")}>
      <List
        data={items}
        preset="continuous"
        renderItem={({ item }) => {
          // TODO: Convert this dot notation to instead use a TS type guard
          // eslint-disable-next-line dot-notation
          const subselections = item["subselections"] || [];

          return (
            <CoffeeSelectionListItem
              subselections={subselections}
              selectedValues={subselections.map(getId)}
              text={item.name}
              disabled
              subselectionDisabled
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
