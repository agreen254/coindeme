import { useTheme } from "next-themes";
import { ThemeType } from "@/utils/types";

export const useThemeTyped = () => {
  const { theme } = useTheme();
  return theme as ThemeType;
};
