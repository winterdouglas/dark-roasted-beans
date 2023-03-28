import React from "react";
import { Screen } from "~components/Screen";
import { ListItem } from "~components/ListItem";
import { AppStackScreenProps } from "~navigation";

type HomeScreenProps = AppStackScreenProps<"Home"> & {};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <Screen title="Brew with Lex" subtitle="Select your style">
      {/* <List
        data={["Lungo", "Cappuccino"]}
        getItemProps={(item) => {
          return { text: item, leftIcon: "ChevronLeft" };
        }}
      /> */}
      <ListItem
        round
        text="Continue"
        onPress={() => navigation.navigate("Overview")}
      />
    </Screen>
  );
};
