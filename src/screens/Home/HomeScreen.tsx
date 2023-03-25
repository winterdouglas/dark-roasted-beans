import React from "react";
import { Text, Screen } from "@components";
import { useHeader } from "hooks/useHeader";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  useHeader({
    title: "This is the title!",
  });

  return (
    <Screen>
      <Text
        preset="bold"
        text="Test"
        onPress={() => {
          navigation.navigate("Overview");
        }}
      />
    </Screen>
  );
};
