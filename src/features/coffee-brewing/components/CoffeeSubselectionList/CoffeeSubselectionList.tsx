import { StyleProp, View, ViewStyle } from "react-native";
import { Separator } from "~components";
import { CheckBox } from "~components/CheckBox";
import { CoffeeExtraOption } from "~features/coffee-brewing/store";
import { useTheme } from "~hooks/useTheme";
import { spacing } from "~theme";

type CoffeeSubselectionListProps = {
  subselections: CoffeeExtraOption[];
  selectedValues?: string[];
  onSelectedValuesChanged?: (values: string[]) => void;
  disabled?: boolean;
};

export const CoffeeSubselectionList = ({
  subselections,
  selectedValues = [],
  onSelectedValuesChanged,
  disabled,
}: CoffeeSubselectionListProps) => {
  const { colors } = useTheme();

  const $topSeparatorStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.onSecondary,
  };

  return (
    !!subselections.length && (
      <View>
        <Separator preset="line" style={$topSeparatorStyle} />
        <View style={$containerStyle}>
          {subselections.map((item, index) => (
            // This can't be a FlatList because it's nested, so mapping it instead
            <CheckBox
              key={index}
              disabled={disabled}
              value={selectedValues.includes(item._id)}
              label={item.name}
              onValueChange={(value) => {
                onSelectedValuesChanged?.(value ? [item._id] : []);
              }}
            />
          ))}
        </View>
      </View>
    )
  );
};

const $containerStyle: ViewStyle = {
  paddingHorizontal: spacing.extraLarge,
  paddingVertical: spacing.medium,
  gap: spacing.extraSmall,
};
