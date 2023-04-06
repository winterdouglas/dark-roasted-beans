import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Small = (props: SvgProps) => (
  <Svg width={46} height={46} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path fill="#219653" d="M-1 0h48v46H-1z" />
        <Path
          d="M13.421 25.684h19.158L29.63 50H16.368l-2.947-24.316Z"
          fill="#F2994A"
        />
        <Path
          d="M14.158 32.316h17.684l-.68 7.368H14.838l-.68-7.368ZM11.947 25.684h22.106L32.013 22H13.987l-2.04 3.684Z"
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
