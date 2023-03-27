import React from "react";
import { ContentStyle, FlashList, FlashListProps } from "@shopify/flash-list";
import { spacing } from "~theme";
import { ListItem, type ListItemProps } from "~components/ListItem";
import { PressableScale } from "~components/PressableScale";
import { Separator } from "~components/Separator";

type BaseListProps<TItem> = Omit<FlashListProps<TItem>, "renderItem"> & {
  getItemProps?: (item: TItem, index: number) => ListItemProps;
  renderItem?: FlashListProps<TItem>["renderItem"];
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

export function List<TItem>({
  preset = "default",
  data,
  renderItem,
  getItemProps,
  ...ListProps
}: ListProps<TItem>) {
  const $listContainerStyle: ContentStyle = {
    ...$listContainerPresets[preset],
    ...(ListProps?.contentContainerStyle ?? {}),
  };

  const $ListProps = { ...$listProps[preset], ...ListProps };

  const $ListItemProps: ListItemProps = $listItemProps[preset];

  const itemSize = ItemSizes[preset];

  return (
    <FlashList<TItem>
      contentContainerStyle={$listContainerStyle}
      data={data}
      estimatedItemSize={itemSize}
      renderItem={(info) => {
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
    />
  );
}

const ItemSizes = {
  default: 94,

  continuous: 90,
} as const;

const $listItemProps = {
  default: { round: true, shadowed: true } as ListItemProps,

  continuous: { bottomSeparator: true } as ListItemProps,
};

const $listProps = {
  default: { ItemSeparatorComponent: Separator } as FlashListProps<any>,

  continuous: {} as FlashListProps<any>,
};

const $listContainerPresets = {
  default: { paddingVertical: spacing.medium } as ContentStyle,

  continuous: { paddingVertical: spacing.medium } as ContentStyle,
};
