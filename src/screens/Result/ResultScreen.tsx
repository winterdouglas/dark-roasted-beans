import React from "react";
import { ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react-native";
import { Screen } from "~components/Screen";
import { ListItem } from "~components/ListItem";
import { AppStackScreenProps } from "~navigation/AppNavigator";

type ResultScreenProps = AppStackScreenProps<"Result"> & {};

export const ResultScreen = ({ navigation }: ResultScreenProps) => {
  const { t } = useTranslation("result");

  return (
    <Screen
      title={t("title")}
      subtitle={t("subtitle")}
      contentContainerStyle={$screenContainerStyle}>
      <Lottie
        source={require("~assets/animations/coffee.json")}
        autoPlay
        loop={false}
        style={$animationStyle}
      />
      <ListItem text={t("restart")} onPress={navigation.popToTop} />
    </Screen>
  );
};

const $screenContainerStyle: ViewStyle = {
  justifyContent: "space-between",
};

const $animationStyle: ViewStyle = {
  width: "100%",
};
