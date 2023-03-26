import { type FlexStyle } from "react-native";
import { type Edge, useSafeAreaInsets } from "react-native-safe-area-context";

export type ExtendedEdge = Edge | "start" | "end";

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
};

const edgeInsetMap: Record<"start" | "end", "left" | "right"> = {
  start: "left",
  end: "right",
};

function isExtended(edge: ExtendedEdge): edge is "start" | "end" {
  return edge === "start" || edge === "end";
}

/**
 * A hook that can be used to create a safe-area-aware style object that can be passed directly to a View.
 * This has been taken from Ignite and tweaked with better typings.
 */
export function useSafeAreaInsetsStyle(
  safeAreaEdges: ExtendedEdge[] = [],
  property: "padding" | "margin" = "padding",
): Pick<
  FlexStyle,
  | "marginBottom"
  | "marginEnd"
  | "marginStart"
  | "marginTop"
  | "paddingBottom"
  | "paddingEnd"
  | "paddingStart"
  | "paddingTop"
> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, edge) => {
    return {
      ...acc,
      [`${property}${propertySuffixMap[edge]}`]:
        insets[isExtended(edge) ? edgeInsetMap[edge] : edge],
    };
  }, {});
}
