import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Screen, ListItem } from "components";
import { CoffeePicker } from "features/coffee-brewing/components/CoffeePicker/CoffeePicker";
import { AppStackScreenProps } from "navigation";

type PickerScreenProps = AppStackScreenProps<"Picker"> & {};

export const PickerScreen = ({ route }: PickerScreenProps) => {
  console.log("SELECTION TYPE:", route.params.selectionType);

  const navigation = useNavigation();

  return (
    <Screen title="Brew with Lex" subtitle="Select your style">
      <CoffeePicker />
      <ListItem
        round
        text="Continue"
        onPress={() => navigation.navigate("Overview")}
      />
    </Screen>
  );
};
