import React from "react";
import { Screen } from "~components/Screen";
import { List } from "~components/List";
import { AppStackScreenProps } from "~navigation";
import { setSelection } from "~features/coffee-brewing/store";
import { Config } from "~config";
import { useAppDispatch } from "~hooks/useAppDispatch";
import { useTranslation } from "react-i18next";
import { ListItem } from "~components";
import { useGetCoffeeMachineItemsByTypeQuery } from "~features/coffee-brewing/hooks/useGetCoffeeMachineItemsByTypeQuery";

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
        getItemProps={(item) => ({
          text: item.name,
          onPress: () => {
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
          },
        })}
      />
      {selectionType === "extras" && (
        <ListItem
          round
          text="Continue"
          onPress={() => navigation.navigate("Overview")}
        />
      )}
    </Screen>
  );
};
