import { useWindowSize } from "@uidotdev/usehooks";
import {
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_LG,
} from "@/validation/defaults";
import { ScreenSize } from "@/utils/types";

/**
 * Matches width of client screen to the screen sizes defined in tailwind.config.ts
 */
export const useScreenSize = (): ScreenSize => {
  const { width } = useWindowSize();

  if (!width) return "XS";
  else if (width < SCREEN_SIZE_XS) return "XS";
  else if (width < SCREEN_SIZE_SM) return "SM";
  else if (width < SCREEN_SIZE_MD) return "MD";
  else if (width < SCREEN_SIZE_LG) return "LG";
  else return "XL";
};
