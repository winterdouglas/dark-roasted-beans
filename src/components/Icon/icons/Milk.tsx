import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Milk = (props: SvgProps) => (
  <Svg width={46} height={46} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path fill="#AED7A0" d="M-1 0h48v46H-1z" />
        <Path
          d="M1.5 20.5C6 30 35.5 22 41.5 10S46 46 46 46H0s-3-35 1.5-25.5Z"
          fill="#fff"
        />
        <Path
          d="M14.157 16.412C16.434 19.47 13.557 21 11.88 21c-1.676 0-3.036-.765-3.795-3.059C7.326 15.647 11.88 8 11.88 8s0 5.353 2.277 8.412Z"
          fill="#fff"
        />
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
