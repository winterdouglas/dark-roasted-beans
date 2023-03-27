import React from "react";
import { Screen } from "~components/Screen";
import { List } from "~components/List";
import { AppStackScreenProps } from "~navigation";
import { setSelection } from "~features/coffee-brewing/store";
import { Config } from "~config";
import { useAppDispatch } from "~hooks/useAppDispatch";
import { useTranslation } from "react-i18next";
import { Button } from "~components";
import { useGetCoffeeMachineItemsByTypeQuery } from "~features/coffee-brewing/hooks/useGetCoffeeMachineItemsByTypeQuery";
import { SelectionListItem } from "~features/coffee-brewing/components/SelectionListItem";

type PickerScreenProps = AppStackScreenProps<"Picker"> & {};

const machineId = Config.MACHINE_ID;

export const PickerScreen = ({ route, navigation }: PickerScreenProps) => {
  const { selectionType } = route.params;
  const { t } = useTranslation(selectionType);
  const dispatch = useAppDispatch();
  const { items } = useGetCoffeeMachineItemsByTypeQuery(
    machineId,
    selectionType,
  );

  return (
    <Screen title={t("title")} subtitle={t("subtitle")}>
      <List
        data={items}
        renderItem={({ item }) => {
          return (
            <SelectionListItem
              subselections={item["subselections"]}
              text={item.name}
              disabled={selectionType === "extras"}
              onPress={() => {
                dispatch(
                  setSelection({
                    type: selectionType,
                    selection: { [item._id]: [] },
                  }),
                );

                if (selectionType === "extras") return;

                const nextSelection =
                  selectionType === "types" ? "sizes" : "extras";

                navigation.push("Picker", { selectionType: nextSelection });
              }}
            />
          );
        }}
      />
      {selectionType === "extras" && (
        <Button
          text={t("continue")}
          onPress={() => navigation.navigate("Overview")}
        />
      )}
    </Screen>
  );
};
