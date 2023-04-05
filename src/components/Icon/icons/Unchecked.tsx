import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Circle,
  Defs,
  ClipPath,
  Path,
} from "react-native-svg";

export const Unchecked = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Circle cx={12} cy={12} r={11} stroke="currentColor" strokeWidth={2} />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
