import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "@components/Screen";
import { ListItem } from "@components/ListItem";
import { AppStackScreenProps } from "@navigation";
import { CoffeePicker } from "@features/coffee-brewing/components";

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
