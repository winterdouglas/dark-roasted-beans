import React from "react";
import { View, ViewStyle } from "react-native";
import { ContentStyle, FlashList, FlashListProps } from "@shopify/flash-list";
import { spacing } from "@theme";
// import { EmptyState } from "../EmptyState";
import { ListItem, type ListItemProps } from "../ListItem";
import { PressableScale } from "../PressableScale";

type BaseListProps<TItem> = Omit<FlashListProps<TItem>, "renderItem"> & {
  getItemProps?: (item: TItem, index: number) => ListItemProps;
};

type DefaultListProps<TItem> = BaseListProps<TItem> & {
  preset?: "default";
};

export type ListProps<TItem> = DefaultListProps<TItem>;

function DefaultList<TItem>({
  data,
  getItemProps,
  ...ListProps
}: DefaultListProps<TItem>) {
  const $listContainerStyle = $listContainerPresets.default;
  const itemSize = ItemSizes.default;

  return (
    <FlashList<TItem>
      contentContainerStyle={$listContainerStyle}
      data={data}
      ItemSeparatorComponent={EmptySeparator}
      estimatedItemSize={itemSize}
      // ListEmptyComponent={EmptyState}
      renderItem={({ item, index }) => {
        return (
          <ListItem
            height={itemSize}
            round
            PressableComponent={PressableScale}
            {...((getItemProps && getItemProps(item, index)) || {})}
          />
        );
      }}
      {...ListProps}
    />
  );
}

export function List<TItem>(props: ListProps<TItem>) {
  return <DefaultList {...props} />;
}

const ItemSizes = {
  default: 94,
} as const;

const EmptySeparator = () => {
  return <View style={$emptySeparator} />;
};

const $emptySeparator: ViewStyle = {
  height: spacing.extraSmall,
};

const $listContainerPresets = {
  default: { paddingVertical: spacing.medium } as ContentStyle,
};
