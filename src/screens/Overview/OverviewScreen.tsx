import React, { useMemo } from "react";
import { ViewStyle } from "react-native";
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
import { Link } from "~components/Link";
import { useTheme } from "~hooks/useTheme";

const MachineId = Config.MACHINE_ID;

type OverviewScreenProps = AppStackScreenProps<"Overview"> & {};

/**
 * Determines the navigation target by the item index, considering the order of types / sizes / extras
 * This is not the most elegant way to find the target.
 * // TODO: Make entities expose a type of the item instead
 * @param index The item index
 */
const findItemTypeByIndex = (index: number) => {
  const targets = ["types", "sizes", "extras"] as const;
  return targets[index] || targets[targets.length - 1];
};

export const OverviewScreen = ({ navigation }: OverviewScreenProps) => {
  const { colors } = useTheme();
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
        style={$listStyle}
        renderItem={({ item, index }) => {
          // TODO: Convert this dot notation to instead use a TS type guard
          // eslint-disable-next-line dot-notation
          const subselections = item["subselections"] || [];

          return (
            <CoffeeSelectionListItem
              shadowed={false}
              subselections={subselections}
              selectedValues={subselections.map(getId)}
              RightComponent={
                <Link
                  containerStyle={$linkContainerStyle}
                  style={{ color: colors.onSecondary }}
                  text={t("edit")}
                  onPress={() =>
                    navigation.navigate("Picker", {
                      selectionType: findItemTypeByIndex(index),
                    })
                  }
                />
              }
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

const $linkContainerStyle: ViewStyle = {
  alignSelf: "center",
};

const $listStyle: ViewStyle = {
  marginVertical: 16,
};
