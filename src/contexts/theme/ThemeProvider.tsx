import { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { useThemeData } from "./useThemeData";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeData();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
