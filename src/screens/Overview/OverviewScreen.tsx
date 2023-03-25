import { Screen, Text } from "components";
import { useHeader } from "hooks/useHeader";

export const OverviewScreen = () => {
  useHeader({
    text: "This is the other screen!",
  });

  return (
    <Screen>
      <Text preset="bold" text="Another screen" />
    </Screen>
  );
};
