import { createContext } from "react";
import { ThemeContextType } from "./useThemeData";

export const ThemeContext = createContext<ThemeContextType | null>(null);
