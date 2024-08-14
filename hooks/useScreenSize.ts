import { useWindowSize } from "@uidotdev/usehooks";
import {
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_LG,
} from "@/validation/defaults";
import { ScreenSize } from "@/utils/types";

/**
 * Matches width of the client screen to the screen sizes defined in tailwind.config.ts.
 *
 * Allows for dynamic adjustment of properties that can only be adjusted using javascript, such as the chart font sizes.
 *
 * Best paired with a hashmap to map each screen size to a corresponding value.
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
