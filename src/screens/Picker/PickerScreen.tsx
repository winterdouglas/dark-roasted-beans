import { ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "~components/Screen";
import { List } from "~components/List";
import { AppStackScreenProps } from "~navigation";
import {
  selectCurrentCoffeeSelectionByType,
  selectMachineId,
  makeSelection,
  makeSubselection,
} from "~features/coffee-brewing/store";
import { useAppDispatch } from "~hooks/useAppDispatch";
import { Icons } from "~components/Icon";
import { Button } from "~components/Button";
import { useGetCoffeeMachineItemsByTypeQuery } from "~features/coffee-brewing/hooks/useGetCoffeeMachineItemsByTypeQuery";
import { CoffeeSelectionListItem } from "~features/coffee-brewing/components/CoffeeSelectionListItem";
import { useAppSelector } from "~hooks/useAppSelector";
import { spacing } from "~theme";

type PickerScreenProps = AppStackScreenProps<"Picker">;

export const PickerScreen = ({ route, navigation }: PickerScreenProps) => {
  const { selectionType } = route.params;
  const { t } = useTranslation(selectionType);
  const dispatch = useAppDispatch();
  const selection = useAppSelector((state) =>
    selectCurrentCoffeeSelectionByType(state, selectionType),
  );
  const machineId = useAppSelector(selectMachineId);
  const { items } = useGetCoffeeMachineItemsByTypeQuery(
    machineId,
    selectionType,
  );

  return (
    <Screen title={t("title")} subtitle={t("subtitle")}>
      <List
        data={items}
        style={$listStyle}
        renderItem={({ item }) => {
          return (
            <CoffeeSelectionListItem
              // TODO: Convert this dot notation to instead use a TS type guard
              // eslint-disable-next-line dot-notation
              subselections={item["subselections"]}
              selectedValues={selection[item._id]}
              leftIcon={item.name as Icons}
              onSelectedValuesChanged={(values) => {
                dispatch(
                  makeSubselection({
                    type: selectionType,
                    selection: { [item._id]: values },
                  }),
                );
              }}
              text={item.name}
              disabled={selectionType === "extras"}
              onPress={() => {
                dispatch(
                  makeSelection({
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

const $listStyle: ViewStyle = {
  marginBottom: spacing.medium,
};
