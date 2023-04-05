import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Path,
  Mask,
  Defs,
  ClipPath,
  Rect,
} from "react-native-svg";

export const Espresso = (props: SvgProps) => (
  <Svg width={46} height={46} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path fill="#219653" d="M-1 0h48v46H-1z" />
        <Mask
          id="c"
          maskUnits="userSpaceOnUse"
          x={8}
          y={14}
          width={30}
          height={37}>
          <Path
            d="M8.25 16.223A2 2 0 0 1 10.237 14h25.526a2 2 0 0 1 1.987 2.223l-3.704 33A2 2 0 0 1 32.058 51H13.942a2 2 0 0 1-1.988-1.777l-3.704-33Z"
            fill="#FFFDFA"
          />
        </Mask>
        <G mask="url(#c)">
          <Path fill="#FFCD9F" d="M7 19h33v27H7z" />
          <Path fill="#FFCD9F" fillOpacity={0.29} d="M7 10h33v34H7z" />
          <Path fill="#5A483B" d="M6 24h33v22H6z" />
        </G>
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h46v46H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Rect width={46} height={46} rx={23} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
);
