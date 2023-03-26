import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Screen } from "@components";
import { useHeader } from "hooks/useHeader";
import { List } from "components/List";

export const HomeScreen = () => {
  const navigation = useNavigation();
  useHeader({
    title: "Brew with Lex",
  });

  return (
    <Screen>
      <Text
        preset="subheading"
        text="Select your style"
        onPress={() => {
          navigation.navigate("Overview");
        }}
      />
      <List
        data={["Lungo", "Capuccino"]}
        getItemProps={(item) => {
          return { text: item, leftIcon: "ChevronLeft" };
        }}
      />
    </Screen>
  );
};
