import React from "react";
import { ContentStyle, FlashList, FlashListProps } from "@shopify/flash-list";
import { spacing } from "~theme";
import { ListItem, type ListItemProps } from "~components/ListItem";
import { PressableScale } from "~components/PressableScale";
import { Separator } from "~components/Separator";

type BaseListProps<TItem> = Omit<FlashListProps<TItem>, "renderItem"> & {
  getItemProps?: (item: TItem, index: number) => ListItemProps;
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

function DefaultList<TItem>({
  data,
  getItemProps,
  ...ListProps
}: DefaultListProps<TItem>) {
  const $listContainerStyles = {
    ...$listContainerPresets.default,
    ...(ListProps?.contentContainerStyle ?? {}),
  };
  const itemSize = ItemSizes.default;

  return (
    <FlashList<TItem>
      contentContainerStyle={$listContainerStyles}
      data={data}
      ItemSeparatorComponent={Separator}
      estimatedItemSize={itemSize}
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

function ContinousList<TItem>({
  data,
  getItemProps,
  ...ListProps
}: ContinuousListProps<TItem>) {
  const $listContainerStyle: ContentStyle = {
    ...$listContainerPresets.continuous,
    ...(ListProps?.contentContainerStyle ?? {}),
  };
  const itemSize = ItemSizes.continous;

  return (
    <FlashList<TItem>
      contentContainerStyle={$listContainerStyle}
      data={data}
      estimatedItemSize={itemSize}
      renderItem={({ item, index }) => {
        return (
          <ListItem
            height={itemSize}
            bottomSeparator
            shadowed={false}
            PressableComponent={PressableScale}
            {...((getItemProps && getItemProps(item, index)) || {})}
          />
        );
      }}
      {...ListProps}
    />
  );
}

export function List<TItem>({
  preset = "default",
  ...props
}: ListProps<TItem>) {
  return preset === "default" ? (
    <DefaultList {...props} />
  ) : (
    <ContinousList {...props} />
  );
}

const ItemSizes = {
  default: 94,
  continous: 90,
} as const;

const $listContainerPresets = {
  default: { paddingVertical: spacing.medium } as ContentStyle,
  continuous: { paddingVertical: spacing.medium } as ContentStyle,
};
