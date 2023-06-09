import { ComponentType } from "react";
import { FlatList, FlatListProps, StyleProp, ViewStyle } from "react-native";
import { spacing } from "~theme";
import { ListItem, type ListItemProps } from "~components/ListItem";
import { Separator } from "~components/Separator";
import { PressableScale } from "~components/PressableScale";
import { useTheme } from "~hooks/useTheme";

type BaseListProps<TItem> = Omit<FlatListProps<TItem>, "renderItem"> & {
  getItemProps?: (item: TItem, index: number) => ListItemProps;
  renderItem?: FlatListProps<TItem>["renderItem"];
};

type DefaultListProps<TItem> = BaseListProps<TItem> & {
  preset?: "default";
};

interface ContinuousListProps<TItem> extends BaseListProps<TItem> {
  preset?: "continuous";
}

export type ListProps<TItem> =
  | DefaultListProps<TItem>
  | ContinuousListProps<TItem>;

export const List = <TItem,>({
  preset = "default",
  data,
  renderItem,
  getItemProps,
  ...ListProps
}: ListProps<TItem>) => {
  const { colors } = useTheme();

  const $themeContainerStyles = {
    default: {} as StyleProp<ViewStyle>,
    continuous: { backgroundColor: colors.secondary } as StyleProp<ViewStyle>,
  };

  const $listContainerStyles: StyleProp<ViewStyle> = [
    $listContainerPresets[preset],
    $themeContainerStyles[preset],
    ListProps?.contentContainerStyle,
  ];

  const $ListProps = { ...$listProps[preset], ...ListProps };

  const $ListItemProps: ListItemProps = $listItemProps[preset];

  const itemSize = ItemSizes[preset];

  return (
    <FlatList<TItem>
      data={data}
      renderItem={(info) => {
        if (!info?.item) return null;
        if (renderItem) return renderItem(info);

        return (
          <ListItem
            height={itemSize}
            PressableComponent={PressableScale}
            {...$ListItemProps}
            {...((getItemProps && getItemProps(info.item, info.index)) || {})}
          />
        );
      }}
      {...$ListProps}
      contentContainerStyle={$listContainerStyles}
    />
  );
};

const ListLineSeparator = () => {
  const { colors } = useTheme();
  return (
    <Separator preset="line" style={{ backgroundColor: colors.onSecondary }} />
  );
};

const ItemSizes = {
  default: 94,

  continuous: 90,
} as const;

const $listItemProps = {
  default: { round: true, shadowed: true } as ListItemProps,

  continuous: {} as ListItemProps,
};

const $listProps = {
  default: { ItemSeparatorComponent: Separator } as FlatListProps<never>,

  continuous: {
    ItemSeparatorComponent: ListLineSeparator as ComponentType,
  } as FlatListProps<never>,
};

const $listContainerPresets = {
  default: {} as ViewStyle,

  continuous: {
    borderRadius: spacing.extraSmall,
    overflow: "hidden",
  } as ViewStyle,
};
