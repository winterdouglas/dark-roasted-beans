import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "@components";
import { List } from "components/List";
import { ListItem } from "components/ListItem";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen title="Brew with Lex" subtitle="Select your style">
      <List
        data={["Lungo", "Cappuccino"]}
        getItemProps={(item) => {
          return { text: item, leftIcon: "ChevronLeft" };
        }}
      />
      <ListItem
        text="Continue"
        onPress={() => navigation.navigate("Overview")}
      />
    </Screen>
  );
};
