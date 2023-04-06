import { ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react-native";
import { Screen } from "~components/Screen";
import { AppStackScreenProps } from "~navigation/AppNavigator";
import { Button } from "~components/Button";
import { useAndroidBackButton } from "~hooks/useAndroidBackButton";

type ResultScreenProps = AppStackScreenProps<"Result">;

export const ResultScreen = ({ navigation }: ResultScreenProps) => {
  const { t } = useTranslation("result");

  const goBackToRoot = () => navigation.popToTop();

  useAndroidBackButton(goBackToRoot);

  return (
    <Screen
      onLeftIconPress={goBackToRoot}
      title={t("title")}
      subtitle={t("subtitle")}
      contentContainerStyle={$screenContainerStyle}>
      <Lottie
        source={require("~assets/animations/coffee.json")}
        autoPlay
        loop={false}
        style={$animationStyle}
      />
      <Button text={t("restart")} onPress={goBackToRoot} />
    </Screen>
  );
};

const $screenContainerStyle: ViewStyle = {
  justifyContent: "space-between",
};

const $animationStyle: ViewStyle = {
  width: "100%",
};
