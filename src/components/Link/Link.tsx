import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { PressableScale } from "~components/PressableScale";
import { Text, TextProps } from "~components/Text";

export type LinkProps = TextProps & {
  onPress?: (ev: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Link = ({
  onPress,
  containerStyle: $containerStyleOverride,
  ...props
}: LinkProps) => {
  return (
    <PressableScale onPress={onPress} style={$containerStyleOverride}>
      <Text {...props} preset="list" />
    </PressableScale>
  );
};
