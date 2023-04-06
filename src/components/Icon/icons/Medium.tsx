import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Medium = (props: SvgProps) => (
  <Svg width={46} height={46} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path fill="#219653" d="M-1 0h48v46H-1z" />
        <Path d="M12.6 20h20.8l-3.2 26.4H15.8L12.6 20Z" fill="#F2994A" />
        <Path
          d="M13.4 27.2h19.2l-.739 8H14.139l-.738-8ZM11 20h24l-2.215-4h-19.57L11 20Z"
          fill="#FFFDFA"
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
