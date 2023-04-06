import { StyleProp, View, ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "~components/Text";

export const LoadingIndicator = () => {
  const { t } = useTranslation();

  return (
    <View style={$containerStyle}>
      <Text text={t("loading")} />
    </View>
  );
};

const $containerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
