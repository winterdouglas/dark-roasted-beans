import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "~components/Screen";
import { ListItem } from "~components/ListItem";

export const HomeScreen = () => {
  const navigation = useNavigation();

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
